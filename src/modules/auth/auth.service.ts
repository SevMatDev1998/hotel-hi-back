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

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hotelService: HotelService,
    private readonly prisma: PrismaService,
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

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;
    console.log(123123);
    
    // Find user by email
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validate password
    if (!user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const isPasswordValid = await this.userService.validatePassword(
      password,
      user.passwordHash,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Get user's hotel
    const hotels = await this.hotelService.findByUserId(user.id);
    if (!hotels || hotels.length === 0) {
      throw new BadRequestException('No hotel associated with this user');
    }

    const hotel = hotels[0]; // Get the first hotel

    return {
      id: user.id,
      email: user.email!,
      hotelId: hotel.id,
      hotelName: hotel.name,
      message: 'Login successful',
    };
  }
}
