import {
  Injectable,
  ConflictException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { HotelService } from '../hotel/hotel.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from './dto/login-response.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hotelService: HotelService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { hotelName, email, password } = registerDto;

    // Check if user already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    try {
      // Use transaction to ensure both user and hotel are created successfully
      const result = await this.prisma.$transaction(async () => {
        // Create user
        const user = await this.userService.createUser(email, password);

        // Create hotel and associate with user
        const hotel = await this.hotelService.createHotel(hotelName, user.id);

        return { user, hotel };
      });

      return {
        id: result.user.id,
        email: result.user.email!,
        hotelId: result.hotel.id,
        hotelName: result.hotel.name,
        message: 'Registration successful',
      };
    } catch {
      throw new BadRequestException('Registration failed. Please try again.');
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userService.findByEmail(email);
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validate password
    const isPasswordValid = await this.userService.validatePassword(
      password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Get user's hotel
    const hotel = await this.hotelService.findByUserId(user.id);
    if (!hotel) {
      throw new BadRequestException('No hotel associated with this user');
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
      }) as any;

    } catch {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // 2) Проверка, что пользователь существует
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // 3) Проверка, что у пользователя есть отель (зеркалим твою логику login)
    const hotel = await this.hotelService.findByUserId(user.id);
    if (!hotel) {
      throw new BadRequestException('No hotel associated with this user');
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

}
