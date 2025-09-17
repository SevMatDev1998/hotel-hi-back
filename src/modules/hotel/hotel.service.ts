import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Hotel } from './entities/hotel.entity';

@Injectable()
export class HotelService {
  constructor(private readonly prisma: PrismaService) {}

  async createHotel(
    name: string,
    userId: number,
    countryId: number = 1,
    currencyId: number = 1,
  ): Promise<Hotel> {
    const hotel = await this.prisma.hotel.create({
      data: {
        name,
        contactPerson: 'Hotel Owner', // Default value
        phoneCode: 374, // Default to Armenia
        phoneNumber: '00000000', // Placeholder
        countryId,
        state: 'Not specified', // Default value
        city: 'Not specified', // Default value
        tinNumber: '00000000', // Placeholder
        director: 'Hotel Director', // Default value
        bankName: 'Not specified', // Default value
        bankAccountNumber: '00000000', // Placeholder
        bankPhoneCode: 374, // Default
        bankPhoneNumber: '00000000', // Placeholder
        currencyId,
        priceSendEmail: 'noreply@hotel.com', // Valid email placeholder
        isActive: false,
        bookingIntegration: false,
      },
    });

    // Create the UserHotel relationship
    await this.prisma.userHotel.create({
      data: {
        userId,
        hotelId: hotel.id,
      },
    });

    return hotel;
  }

  async findById(id: number): Promise<Hotel | null> {
    return this.prisma.hotel.findUnique({
      where: { id },
    });
  }

  async findByUserId(userId: number): Promise<Hotel[]> {
    const userHotels = await this.prisma.userHotel.findMany({
      where: { userId },
      include: { hotel: true },
    });

    return userHotels.map((userHotel) => userHotel.hotel);
  }
}
