import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHotelFoodDto, UpdateHotelFoodDto } from './dto';
import { FoodType as PrismaFoodType } from '@prisma/client';

@Injectable()
export class HotelFoodService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHotelFoodDto: CreateHotelFoodDto) {
    const {
      hotelId,
      name,
      description,
      foodType,
      startDate,
      endDate,
      cuisineIds,
      foodOfferTypeIds,
    } = createHotelFoodDto;

    // Create the main HotelFood record
    const hotelFood = await this.prisma.hotelFood.create({
      data: {
        hotelId,
        name,
        description,
        foodType: foodType as unknown as PrismaFoodType,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
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

  async update(id: number, updateHotelFoodDto: UpdateHotelFoodDto) {
    const {
      name,
      description,
      foodType,
      startDate,
      endDate,
      cuisineIds,
      foodOfferTypeIds,
    } = updateHotelFoodDto;

    // Check if the record exists
    await this.findOne(id);

    // Update the main HotelFood record
    const updateData: {
      name?: string;
      description?: string;
      foodType?: PrismaFoodType;
      startDate?: Date;
      endDate?: Date;
    } = {};
    
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (foodType !== undefined) {
      updateData.foodType = foodType as unknown as PrismaFoodType;
    }
    if (startDate !== undefined) updateData.startDate = new Date(startDate);
    if (endDate !== undefined) updateData.endDate = new Date(endDate);

    if (Object.keys(updateData).length > 0) {
      await this.prisma.hotelFood.update({
        where: { id },
        data: updateData,
      });
    }

    // Update cuisines if provided
    if (cuisineIds !== undefined) {
      // Delete existing relations
      await this.prisma.hotelFoodCuisine.deleteMany({
        where: { hotelFoodId: id },
      });

      // Create new relations
      if (cuisineIds.length > 0) {
        await this.prisma.hotelFoodCuisine.createMany({
          data: cuisineIds.map((cuisineId: number) => ({
            hotelFoodId: id,
            cuisineId,
          })),
        });
      }
    }

    // Update food offer types if provided
    if (foodOfferTypeIds !== undefined) {
      // Delete existing relations
      await this.prisma.hotelFoodOfferType.deleteMany({
        where: { hotelFoodId: id },
      });

      // Create new relations
      if (foodOfferTypeIds.length > 0) {
        await this.prisma.hotelFoodOfferType.createMany({
          data: foodOfferTypeIds.map((offerTypeId: number) => ({
            hotelFoodId: id,
            offerTypeId,
          })),
        });
      }
    }

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id); // Check if exists

    // Delete related records first
    await this.prisma.hotelFoodCuisine.deleteMany({
      where: { hotelFoodId: id },
    });

    await this.prisma.hotelFoodOfferType.deleteMany({
      where: { hotelFoodId: id },
    });

    // Delete the main record
    return this.prisma.hotelFood.delete({
      where: { id },
    });
  }
}
