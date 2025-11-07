import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHotelFoodPriceDto } from './dto/create-hotel-food-price.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class HotelFoodPriceService {
  constructor(private readonly prisma: PrismaService) {}


  async createWithTransaction(
    tx: Prisma.TransactionClient,
    createHotelFoodPriceDto: CreateHotelFoodPriceDto,
  ) {
    const existing = await tx.hotelFoodPrice.findFirst({
      where: {
        hotelAvailabilityId: createHotelFoodPriceDto.hotelAvailabilityId,
        hotelAgeAssignmentId: createHotelFoodPriceDto.hotelAgeAssignmentId,
        hotelFoodId: createHotelFoodPriceDto.hotelFoodId,
      },
    });

    if (existing) {
      return tx.hotelFoodPrice.update({
        where: { id: existing.id },
        data: {
          price: createHotelFoodPriceDto.price,
          includedInPrice: createHotelFoodPriceDto.includedInPrice,
        },
      });
    }

    return tx.hotelFoodPrice.create({
      data: {
        ...createHotelFoodPriceDto,
      },
    });
  }

  async createMany(
    tx: Prisma.TransactionClient,
    dtos: CreateHotelFoodPriceDto[],
  ) {
    // Если массив пустой, ничего не делаем
    if (dtos.length === 0) {
      return [];
    }

    // Получаем hotelAvailabilityId из первого элемента (все должны иметь одинаковый)
    const hotelAvailabilityId = dtos[0].hotelAvailabilityId;

    // Сначала удаляем все существующие записи для этого hotelAvailabilityId
    await tx.hotelFoodPrice.deleteMany({
      where: {
        hotelAvailabilityId: hotelAvailabilityId,
      },
    });

    // Затем создаем новые записи
    return Promise.all(dtos.map((dto) => this.createWithTransaction(tx, dto)));
  }
}
