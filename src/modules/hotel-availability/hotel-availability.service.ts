import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHotelAvailabilityDto } from './dto/create-hotel-availability.dto';
import { HotelAvailability } from '@prisma/client';
import { HotelAgeAssignmentService } from '../hotel-age-assignment/hotel-age-assignment.service';

@Injectable()
export class HotelAvailabilityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hotelAgeAssignmentService: HotelAgeAssignmentService,
  ) {}

  async create(
    createHotelAvailabilityDto: CreateHotelAvailabilityDto,
    hotelId: number,
  ): Promise<HotelAvailability> {
    const { title, checkInTime, checkoutTime, hotelAgeAssignments } = createHotelAvailabilityDto;

    const hotelAvailability = await this.prisma.hotelAvailability.create({
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

    if (hotelAgeAssignments && hotelAgeAssignments.length > 0) {
      for (const assignment of hotelAgeAssignments) {
        await this.hotelAgeAssignmentService.create({
          ...assignment,
          hotelAvailabilityId: hotelAvailability.id,
        });
      }
    }

    return hotelAvailability;
  }


  async findByHotelId(hotelId: number): Promise<HotelAvailability[]> {
    return this.prisma.hotelAvailability.findMany({
      where: { hotelId },
    });
  }


  async findDetailsByHotelId(hotelId: number): Promise<void> {
    const foods = await this.prisma.hotelFood.findMany({
      where: { hotelId },
    });
  }

}