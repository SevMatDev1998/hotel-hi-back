import {
  Injectable,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthErrorCode, AuthSuccessCode } from './enums/auth-error-codes.enum';
import { UserService } from '../user/user.service';
import { HotelService } from '../hotel/hotel.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { EmailService } from '../email/email.service';
import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hotelService: HotelService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { hotelName, email, password } = registerDto;

    // Check if user already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException(AuthErrorCode.USER_ALREADY_EXISTS);
    }

    try {
      // Use transaction to ensure both user and hotel are created successfully
      const result = await this.prisma.$transaction(async () => {
        // Create user
        const user = await this.userService.createUser(email, password);

        // Generate email confirmation token
        const confirmationToken = this.generateConfirmationToken();
        const tokenExpiry = new Date();
        tokenExpiry.setHours(tokenExpiry.getHours() + 24); // 24 hours expiry

        // Update user with confirmation token
        await this.prisma.user.update({
          where: { id: user.id },
          data: {
            emailConfirmationToken: confirmationToken,
            emailConfirmationTokenExpiry: tokenExpiry,
          },
        });

        // Create hotel and associate with user
        const hotel = await this.hotelService.createHotel(hotelName, user.id);

        // Send confirmation email (non-blocking)
        this.emailService
          .sendEmailConfirmation(
            email,
            confirmationToken,
            user.email || undefined,
          )
          .catch((error) => {
            console.error('Failed to send confirmation email:', error);
          });

        return { user, hotel };
      });

      return {
        id: result.user.id,
        email: result.user.email!,
        hotelId: result.hotel.id,
        hotelName: result.hotel.name,
        message: AuthSuccessCode.REGISTRATION_SUCCESS,
      };
    } catch {
      throw new BadRequestException(AuthErrorCode.REGISTRATION_FAILED);
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userService.findByEmail(email);
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException(AuthErrorCode.INVALID_CREDENTIALS);
    }

    // Validate password
    const isPasswordValid = await this.userService.validatePassword(
      password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException(AuthErrorCode.INVALID_CREDENTIALS);
    }

    // Check if email is confirmed
    if (!user.emailConfirmed) {
      throw new UnauthorizedException(AuthErrorCode.EMAIL_NOT_CONFIRMED);
    }

    // Get user's hotel
    const hotel = await this.hotelService.findByUserId(user.id);
    if (!hotel) {
      throw new BadRequestException(AuthErrorCode.NO_HOTEL_ASSOCIATED);
    }

    // ======== Generate Tokens =========
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '30d',
    });

    // ======== Return result =========
    return {
      user: {
        id: user.id,
        email: user.email,
        hotelId: hotel.id,
        hotelName: hotel.name,
      },
      accessToken,
      refreshToken,
    };
  }

  async getNavigationAccessStep(
    hotelId: number,
  ): Promise<{ navigationAccessStep: number }> {
    const navigationAccessStep =
      await this.hotelService.findNavigationStep(hotelId);

    return { navigationAccessStep };
  }

  async updateNavigationAccessStep(
    hotelId: number,
    stepNumber: number,
  ): Promise<{ navigationAccessStep: number; message: string }> {
    const updatedStep = await this.hotelService.updateNavigationStep(
      hotelId,
      stepNumber,
    );
    return {
      navigationAccessStep: updatedStep,
      message: AuthSuccessCode.NAVIGATION_STEP_UPDATED,
    };
  }

  async me(userId: number) {
    const user = await this.userService.findById(userId);
    const hotel = await this.hotelService.findByUserId(userId);

    const data = {
      ...user,
      hotelId: hotel ? hotel.id : null,
    };

    return data;
  }

  async refresh(refreshToken: string): Promise<RefreshResponseDto> {
    // 1) Проверка и разбор токена
    let payload: { sub: number; email?: string; iat: number; exp: number };
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException(AuthErrorCode.INVALID_REFRESH_TOKEN);
    }

    // 2) Проверка, что пользователь существует
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException(AuthErrorCode.USER_NOT_FOUND);
    }

    // 3) Проверка, что у пользователя есть отель (зеркалим твою логику login)
    const hotel = await this.hotelService.findByUserId(user.id);
    if (!hotel) {
      throw new BadRequestException(AuthErrorCode.NO_HOTEL_ASSOCIATED);
    }

    // 4) Выпуск новой пары токенов
    const accessPayload = { sub: user.id, email: user.email };
    const [accessToken, newRefreshToken] = await Promise.all([
      this.jwtService.signAsync(accessPayload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(accessPayload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '30d',
      }),
    ]);

    // 5) Возвращаем в том же формате, что login
    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  // ============ Email Confirmation Methods ============

  private generateConfirmationToken(): string {
    return crypto.randomBytes(32).toString('hex');
  }

  async confirmEmail(token: string): Promise<{ message: string }> {
    const user = await this.prisma.user.findFirst({
      where: {
        emailConfirmationToken: token,
        emailConfirmationTokenExpiry: {
          gte: new Date(), // Token not expired
        },
      },
    });

    if (!user) {
      throw new BadRequestException(AuthErrorCode.INVALID_CONFIRMATION_TOKEN);
    }

    // Update user: confirm email and clear token
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailConfirmed: true,
        emailConfirmationToken: null,
        emailConfirmationTokenExpiry: null,
      },
    });

    return {
      message: AuthSuccessCode.EMAIL_CONFIRMED,
    };
  }

  async resendConfirmationEmail(email: string): Promise<{ message: string }> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException(AuthErrorCode.USER_NOT_FOUND);
    }

    if (user.emailConfirmed) {
      throw new BadRequestException(AuthErrorCode.EMAIL_ALREADY_CONFIRMED);
    }

    // Generate new confirmation token
    const confirmationToken = this.generateConfirmationToken();
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 24); // 24 hours expiry

    // Update user with new token
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailConfirmationToken: confirmationToken,
        emailConfirmationTokenExpiry: tokenExpiry,
      },
    });

    // Send confirmation email
    await this.emailService.sendEmailConfirmation(
      email,
      confirmationToken,
      user.email || undefined,
    );

    return {
      message: AuthSuccessCode.CONFIRMATION_EMAIL_SENT,
    };
  }

  async validateToken(
    token: string,
  ): Promise<{ valid: boolean; email?: string; userId?: number }> {
    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: number;
        email?: string | undefined;
        purpose?: string | undefined;
      }>(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      const user = await this.userService.findById(payload.sub);

      if (!user) {
        return { valid: false };
      }

      return {
        valid: true,
        email: user.email || undefined,
        userId: user.id,
      };
    } catch {
      return { valid: false };
    }
  }

  // ============ Password Reset Methods ============

  async requestPasswordReset(email: string): Promise<{ message: string }> {
    const user = await this.userService.findByEmail(email);
    if (!user || !user.email) {
      throw new BadRequestException(AuthErrorCode.EMAIL_NOT_FOUND);
    }

    // Generate JWT token with short expiry (1h) for password reset
    const resetToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        purpose: 'password-reset',
      },
      {
        secret:
          process.env.JWT_PASSWORD_RESET_SECRET ||
          process.env.JWT_ACCESS_SECRET,
        expiresIn: '1h',
      },
    );

    // Send email (non-blocking but awaited to surface errors if any)
    await this.emailService.sendPasswordReset(user.email, resetToken);

    return { message: AuthSuccessCode.RESET_EMAIL_SENT };
  }

  async setNewPassword(
    token: string,
    newPassword: string,
  ): Promise<{ message: string }> {
    let payload: { sub: number; email?: string; purpose?: string };
    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret:
          process.env.JWT_PASSWORD_RESET_SECRET ||
          process.env.JWT_ACCESS_SECRET,
      });
    } catch {
      throw new BadRequestException(AuthErrorCode.INVALID_RESET_TOKEN);
    }

    if (payload.purpose !== 'password-reset' || !payload.email) {
      throw new BadRequestException(AuthErrorCode.INVALID_TOKEN_CONTEXT);
    }

    const user = await this.userService.findById(payload.sub);
    if (
      !user ||
      !user.email ||
      user.email.toLowerCase() !== payload.email.toLowerCase()
    ) {
      throw new BadRequestException(AuthErrorCode.INVALID_TOKEN_USER);
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: hashed },
    });

    return { message: AuthSuccessCode.PASSWORD_UPDATED };
  }
}
