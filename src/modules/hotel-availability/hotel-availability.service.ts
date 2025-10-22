import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHotelAvailabilityDto } from './dto/create-hotel-availability.dto';
import { HotelAvailability } from '@prisma/client';

@Injectable()
export class HotelAvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createHotelAvailabilityDto: CreateHotelAvailabilityDto,
    hotelId: number,
  ): Promise<HotelAvailability> {
    const { title, checkInTime, checkoutTime } = createHotelAvailabilityDto;

    return this.prisma.hotelAvailability.create({
      data: {
        hotelId,
        title,
        color: '',
        // checkInTime: new Date(checkInTime),
        // checkoutTime: new Date(checkoutTime),

        checkInTime: new Date(),
        checkoutTime: new Date(),
      },
    });
  }

  async findByHotelId(hotelId: number): Promise<HotelAvailability[]> {
    return this.prisma.hotelAvailability.findMany({
      where: { hotelId },
    });
  }
}
