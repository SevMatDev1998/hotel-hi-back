import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHotelFoodPriceDto } from './dto/create-hotel-food-price.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class HotelFoodPriceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHotelFoodPriceDto: CreateHotelFoodPriceDto) {
    return this.prisma.hotelFoodPrice.create({
      data: {
        ...createHotelFoodPriceDto,
      },
    });
  }

  async createWithTransaction(
    tx: Prisma.TransactionClient,
    createHotelFoodPriceDto: CreateHotelFoodPriceDto,
  ) {
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
    return Promise.all(dtos.map((dto) => this.createWithTransaction(tx, dto)));
  }
}
