import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHotelFoodPriceDto } from './dto/create-hotel-food-price.dto';

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
}
