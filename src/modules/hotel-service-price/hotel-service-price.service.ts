import { Injectable } from '@nestjs/common';
import { ServicePriceType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

interface CreateHotelServicePriceDto {
  hotelServiceId: number;
  hotelAvailabilityId: number;
  priceType: ServicePriceType; // HourlyRate | DailyRate | ByOrderRate
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
      // Для каждой цены делаем upsert (обновить или создать)
      for (const dto of dtos) {
        const dateFrom = new Date(dto.dateFrom);
        const dateTo = new Date(dto.dateTo);

        // Ищем существующую запись
        const existingPrice = await tx.hotelServicePrice.findFirst({
          where: {
            hotelServiceId: Number(dto.hotelServiceId),
            hotelAvailabilityId: Number(dto.hotelAvailabilityId),
            dateFrom: dateFrom,
            dateTo: dateTo,
          },
        });

        if (existingPrice) {
          // Если запись существует → обновляем
          await tx.hotelServicePrice.update({
            where: { id: existingPrice.id },
            data: {
              priceType: dto.priceType,
              price: Number(dto.price),
            },
          });
        } else {
          // Если записи нет → создаём
          await tx.hotelServicePrice.create({
            data: {
              hotelServiceId: Number(dto.hotelServiceId),
              hotelAvailabilityId: Number(dto.hotelAvailabilityId),
              priceType: dto.priceType,
              price: Number(dto.price),
              dateFrom: dateFrom,
              dateTo: dateTo,
            },
          });
        }
      }

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
