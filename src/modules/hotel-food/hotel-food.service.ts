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
        startDate: startDate,
        endDate: endDate,
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
    return this.prisma.$queryRawUnsafe<any[]>(`
      SELECT 
        hf.id,
        hf.name,
        hf."startDate",
        hf."endDate",
        hf."isFoodAvailable",
        hf."foodType" AS "foodType",
        ARRAY_AGG(DISTINCT hfc."cuisineId") AS "cuisineIds",
        ARRAY_AGG(DISTINCT hfot."offerTypeId") AS "foodOfferTypeIds"
      FROM "HotelFoods" hf
      LEFT JOIN "HotelFoodCuisines" hfc ON hfc."hotelFoodId" = hf.id
      LEFT JOIN "HotelFoodOfferTypes" hfot ON hfot."hotelFoodId" = hf.id
      WHERE hf."hotelId" = ${hotelId} AND hf."isFoodAvailable" = true
      GROUP BY hf.id;
    `);
  }

  async update(hotelId: number, updateHotelFoodDto: UpdateHotelFoodDto) {
    const {
      name,
      description,
      foodType,
      startDate,
      isFoodAvailable,
      endDate,
      cuisineIds,
      foodOfferTypeIds,
    } = updateHotelFoodDto;

    // Проверяем, есть ли текущая запись HotelFood
    const existingHotelFood = await this.prisma.hotelFood.findFirst({
      where: { hotelId, foodType: foodType as unknown as PrismaFoodType },
    });

    if (existingHotelFood) {
      const existingId = existingHotelFood.id;

      // Удаляем все связи
      await this.prisma.hotelFoodCuisine.deleteMany({
        where: { hotelFoodId: existingId },
      });

      await this.prisma.hotelFoodOfferType.deleteMany({
        where: { hotelFoodId: existingId },
      });

      await this.prisma.hotelFoodPrice.deleteMany({
        where: { hotelFoodId: existingId },
      });

      // Удаляем саму запись
      await this.prisma.hotelFood.delete({
        where: { id: existingId },
      });
    }
    // Создаём новую запись HotelFood
    const newHotelFood = await this.prisma.hotelFood.create({
      data: {
        hotelId,
        name: 'name!',
        description: 'description!',
        // foodType: foodType as unknown as PrismaFoodType, // ✅ Конвертация
        foodType: foodType as unknown as PrismaFoodType, // ✅ Конвертация
        isFoodAvailable,
        startDate: startDate!,
        endDate: endDate!,
        statusId: 'Draft', // Required field in schema
      },
    });

    // Добавляем кухни
    if (cuisineIds && cuisineIds.length > 0) {
      await this.prisma.hotelFoodCuisine.createMany({
        data: cuisineIds.map((cuisineId: number) => ({
          hotelFoodId: newHotelFood.id,
          cuisineId,
        })),
      });
    }

    // Добавляем типы предложений
    if (foodOfferTypeIds && foodOfferTypeIds.length > 0) {
      await this.prisma.hotelFoodOfferType.createMany({
        data: foodOfferTypeIds.map((offerTypeId: number) => ({
          hotelFoodId: newHotelFood.id,
          offerTypeId,
        })),
      });
    }

    // Возвращаем новую запись
    return this.prisma.hotelFood.findUnique({
      where: { id: newHotelFood.id },
      include: {
        hotelFoodCuisines: true,
        hotelFoodOfferTypes: true,
      },
    });
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

    await this.prisma.hotelFoodPrice.deleteMany({
      where: { hotelFoodId: id },
    });

    // Delete the main record
    return this.prisma.hotelFood.delete({
      where: { id },
    });
  }
}
