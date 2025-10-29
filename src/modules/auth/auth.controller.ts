import { Controller, Post, Body, HttpStatus, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { User } from '../user/decorators/user.decorator';
import { LoginResponseDto } from './dto/login-response.dto';
import { Public } from './decorators/public.decorator';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RefreshResponseDto } from './dto/refresh-response.dto';
import { ValidateTokenDto } from './dto/validate-token.dto';
import { ResendConfirmationDto } from './dto/resend-confirmation.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  @ApiOperation({ summary: 'Register a new user with hotel' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:
      'User and hotel created successfully. Confirmation email sent.',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request - passwords do not match or registration failed',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User with this email already exists',
  })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @Public()
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User logged in successfully',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(loginDto);
  }

  @Get('me')
  me(@User('userId') userId: number) {
    return this.authService.me(userId);
  }

  @Post('refresh')
  @Public()
  @ApiOperation({ summary: 'Refresh access & refresh tokens' })
  @ApiResponse({ status: 200, type: LoginResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid or expired refresh token' })
  async refresh(@Body() body: RefreshTokenDto): Promise<RefreshResponseDto> {
    return this.authService.refresh(body.refreshToken);
  }

  @Get('verify-registration/:token')
  @Public()
  @ApiOperation({ summary: 'Confirm email address with token' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Email confirmed successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid or expired confirmation token',
  })
  async confirmEmail(
    @Param('token') token: string,
  ): Promise<{ message: string }> {
    return this.authService.confirmEmail(token);
  }

  @Post('resend-confirmation')
  @Public()
  @ApiOperation({ summary: 'Resend email confirmation' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Confirmation email sent',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User not found or email already confirmed',
  })
  async resendConfirmation(
    @Body() resendDto: ResendConfirmationDto,
  ): Promise<{ message: string }> {
    return this.authService.resendConfirmationEmail(resendDto.email);
  }

  @Post('validate-token')
  @Public()
  @ApiOperation({ summary: 'Validate if JWT token is valid' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Token validation result',
  })
  async validateToken(
    @Body() validateTokenDto: ValidateTokenDto,
  ): Promise<{ valid: boolean; email?: string; userId?: number }> {
    return this.authService.validateToken(validateTokenDto.token);
  }
}
