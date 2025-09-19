import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { HotelServiceService } from '../hotel-service/hotel-service.service';
import { CreateHotelServiceAvailabilityDto } from './dto';
import { CompletenessStatus } from '@prisma/client';

@Injectable()
export class HotelServiceAvailabilityService {
  constructor(
    private prisma: PrismaService,
    private hotelServiceService: HotelServiceService,
  ) {}

  async createHotelServiceWithAvailabilities(
    createDto: CreateHotelServiceAvailabilityDto,
  ) {
    const { hotelId, serviceId, availabilities } = createDto;

    // 1. Check if HotelService already exists
    let hotelService = await this.prisma.hotelService.findFirst({
      where: {
        hotelId,
        serviceId,
      },
    });

    // 2. If not exists, create new HotelService
    if (!hotelService) {
      hotelService = await this.hotelServiceService.createHotelService(
        hotelId,
        serviceId,
        CompletenessStatus.Draft,
      );
    }

    // 3. Create all availabilities
    const createdAvailabilities = await Promise.all(
      availabilities.map((availability) =>
        this.prisma.hotelServiceAvailability.create({
          data: {
            hotelServiceId: hotelService.id,
            availabilityTypeId: availability.availabilityTypeId,
            hourlyAvailabilityTypeId: availability.hourlyAvailabilityTypeId,
            payMethodId: availability.payMethodId,
            startTime: availability.startTime
              ? new Date(availability.startTime)
              : null,
            endTime: availability.endTime
              ? new Date(availability.endTime)
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
}
