import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHotelFoodDto } from './dto';
import { FoodType as PrismaFoodType } from '@prisma/client';

@Injectable()
export class HotelFoodService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHotelFoodDto: CreateHotelFoodDto) {
    const { hotelId, foodType, cuisineIds, foodOfferTypeIds } =
      createHotelFoodDto;

    // Create the main HotelFood record
    const hotelFood = await this.prisma.hotelFood.create({
      data: {
        hotelId,
        name: '', // Required field in schema
        foodType: foodType as unknown as PrismaFoodType,
        statusId: 'Draft', // Required field in schema
      },
    });

    // Create HotelFoodCuisine records
    if (cuisineIds && cuisineIds.length > 0) {
      await this.prisma.hotelFoodCuisine.createMany({
        data: cuisineIds.map((cuisineId) => ({
          hotelFoodId: hotelFood.id,
          cuisineId,
        })),
      });
    }

    // Create HotelFoodOfferType records
    if (foodOfferTypeIds && foodOfferTypeIds.length > 0) {
      await this.prisma.hotelFoodOfferType.createMany({
        data: foodOfferTypeIds.map((offerTypeId) => ({
          hotelFoodId: hotelFood.id,
          offerTypeId,
        })),
      });
    }

    // Return the created record with relations
    return this.findOne(hotelFood.id);
  }

  async findAll(hotelId?: number) {
    const whereCondition = hotelId ? { hotelId } : {};

    return this.prisma.hotelFood.findMany({
      where: whereCondition,
      include: {
        hotelFoodCuisines: {
          include: {
            cuisine: true,
          },
        },
        hotelFoodOfferTypes: {
          include: {
            offerType: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const hotelFood = await this.prisma.hotelFood.findUnique({
      where: { id },
      include: {
        hotelFoodCuisines: {
          include: {
            cuisine: true,
          },
        },
        hotelFoodOfferTypes: {
          include: {
            offerType: true,
          },
        },
      },
    });

    if (!hotelFood) {
      throw new NotFoundException(`Hotel food with ID ${id} not found`);
    }

    return hotelFood;
  }

  async findByHotel(hotelId: number) {
    return this.prisma.hotelFood.findMany({
      where: { hotelId },
      include: {
        hotelFoodCuisines: {
          include: {
            cuisine: true,
          },
        },
        hotelFoodOfferTypes: {
          include: {
            offerType: true,
          },
        },
      },
    });
  }
}
