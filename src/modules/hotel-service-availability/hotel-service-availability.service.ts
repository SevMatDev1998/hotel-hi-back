import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { HotelServiceService } from '../hotel-service/hotel-service.service';
import { CreateHotelServiceAvailabilityDto } from './dto';
import { HotelServiceAvailability } from '@prisma/client';

@Injectable()
export class HotelServiceAvailabilityService {
  constructor(
    private prisma: PrismaService,
    private hotelServiceService: HotelServiceService,
  ) {}

  async createHotelServiceWithAvailabilities(
    hotelServiceId: number,
    createDto: CreateHotelServiceAvailabilityDto,
  ) {
    const { availabilities } = createDto;

    // 1. Check if HotelService exists
    const hotelService = await this.prisma.hotelService.findUnique({
      where: { id: hotelServiceId },
    });

    if (!hotelService) {
      throw new Error(`HotelService with ID ${hotelServiceId} not found.`);
    }

    // Delete existing room parts for this hotel room
    await this.prisma.hotelServiceAvailability.deleteMany({
      where: { hotelServiceId: hotelServiceId },
    });

    // 2. Create all availabilities
    const createdAvailabilities = await Promise.all(
      availabilities.map((availability) =>
        this.prisma.hotelServiceAvailability.create({
          data: {
            hotelServiceId: hotelServiceId,
            isPaid: availability.isPaid ?? false,
            startMonth: new Date(availability.startMonth),
            endMonth: new Date(availability.endMonth),
            hourlyAvailabilityTypeId: availability.hourlyAvailabilityTypeId,
            startHour: availability.startHour
              ? new Date(availability.startHour)
              : null,
            endHour: availability.endHour
              ? new Date(availability.endHour)
              : null,
          },
        }),
      ),
    );

    return {
      hotelService,
      availabilities: createdAvailabilities,
    };
  }

  async findByhotelServiceId(
    hotelServiceId: number,
  ): Promise<HotelServiceAvailability | null> {
    const test = await this.prisma.hotelServiceAvailability.findFirst({
      where: {
        hotelServiceId,
      },
    });
    console.log(test, hotelServiceId);

    return test;
  }
}
