import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHotelAvailabilityDto } from './dto/create-hotel-availability.dto';
import { HotelAvailability } from '@prisma/client';

@Injectable()
export class HotelAvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createHotelAvailabilityDto: CreateHotelAvailabilityDto,
  ): Promise<HotelAvailability> {
    const { hotelId, dateFrom, dateTo } = createHotelAvailabilityDto;

    return this.prisma.hotelAvailability.create({
      data: {
        hotelId,
        dateFrom: new Date(dateFrom),
        dateTo: new Date(dateTo),
      },
    });
  }
}
