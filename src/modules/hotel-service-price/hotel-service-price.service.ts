import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

interface CreateHotelServicePriceDto {
  hotelServiceId: number;
  hotelAvailabilityId: number;
  price: number;
  dateFrom: string;
  dateTo: string;
}

@Injectable()
export class HotelServicePriceService {
  constructor(private prisma: PrismaService) {}

  async createBulk(dtos: CreateHotelServicePriceDto[]) {
    if (dtos.length === 0) {
      return [];
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.hotelServicePrice.createMany({
        data: dtos.map((dto) => ({
          hotelServiceId: Number(dto.hotelServiceId),
          hotelAvailabilityId: Number(dto.hotelAvailabilityId),
          price: Number(dto.price),
          dateFrom: new Date(dto.dateFrom),
          dateTo: new Date(dto.dateTo),
        })),
      });

      const hotelServiceIds = [
        ...new Set(dtos.map((dto) => dto.hotelServiceId)),
      ];

      return tx.hotelServicePrice.findMany({
        where: {
          hotelServiceId: {
            in: hotelServiceIds,
          },
        },
        include: {
          hotelService: {
            include: {
              service: {
                include: {
                  systemServiceType: {
                    include: {
                      systemServiceGroup: true,
                    },
                  },
                },
              },
            },
          },
          hotelAvailability: true,
        },
      });
    });
  }
}
