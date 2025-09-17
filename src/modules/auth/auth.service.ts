import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { HotelService } from '../hotel/hotel.service';
import { RegisterDto } from './dto/register.dto';
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
    const { hotelName, email, password, passwordConfirm } = registerDto;

    // Validate password confirmation
    if (password !== passwordConfirm) {
      throw new BadRequestException('Passwords do not match');
    }

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
}
