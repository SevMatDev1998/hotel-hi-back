import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HotelAgeAssignmentDto } from './dto/hotel-age-assignment.dto';

@Injectable()
export class HotelAgeAssignmentService {
  constructor(private prisma: PrismaService) {}

  async create(createHotelAgeAssignmentDto: HotelAgeAssignmentDto) {
    const {
      hotelAvailabilityId,
      name,
      fromAge,
      toAge,
      bedType,
      isAdditional = false,
    } = createHotelAgeAssignmentDto;

    return this.prisma.hotelAgeAssignment.create({
      data: {
        hotelAvailabilityId,
        name,
        fromAge,
        toAge,
        bedType,
        isAdditional,
      },
    });
  }

  async findByHotelAvailabilityId(hotelAvailabilityId: number) {
    return await this.prisma.hotelAgeAssignment.findMany({
      where: {
        hotelAvailabilityId,
      },
    });
  }
}
