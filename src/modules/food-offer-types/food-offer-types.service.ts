import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FoodOfferTypeDto } from './dto/food-offer-type.dto';

@Injectable()
export class FoodOfferTypesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<FoodOfferTypeDto[]> {
    const foodOfferTypes = await this.prisma.foodOfferType.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return foodOfferTypes.map((foodOfferType) => ({
      id: foodOfferType.id,
      name: foodOfferType.name,
      createdAt: foodOfferType.createdAt,
      updatedAt: foodOfferType.updatedAt,
    }));
  }
}
