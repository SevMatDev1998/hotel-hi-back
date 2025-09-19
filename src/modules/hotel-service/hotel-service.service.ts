import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CompletenessStatus } from '@prisma/client';

@Injectable()
export class HotelServiceService {
  constructor(private prisma: PrismaService) {}

  async createHotelService(
    hotelId: number,
    serviceId: number,
    statusId: CompletenessStatus = CompletenessStatus.Draft,
  ) {
    return await this.prisma.hotelService.create({
      data: {
        hotelId,
        serviceId,
        statusId,
      },
    });
  }
}
