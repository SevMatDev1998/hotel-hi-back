import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CompletenessStatus, HotelService } from '@prisma/client';

@Injectable()
export class HotelServiceService {
  constructor(private prisma: PrismaService) { }

  async findByHotelId(hotelId: number): Promise<HotelService[]> {
    return await this.prisma.hotelService.findMany({
      where: {
        hotelId,
      },
      include: {
        service: {
          select: {
            name: true, // ✅ this is correct
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  }


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

  async deleteHotelService(hotelServiceId: number): Promise<HotelService> {
    return await this.prisma.hotelService.delete({
      where: {
        id: hotelServiceId,
      },
    });
  }
}
