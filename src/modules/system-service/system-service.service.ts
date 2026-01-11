import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SystemServiceDto } from './dto/system-service.dto';

@Injectable()
export class SystemServiceService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<SystemServiceDto[]> {
    const systemServices = await this.prisma.systemService.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return systemServices.map((service) => ({
      id: service.id,
      name: service.name,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    }));
  }

  async findByTypeId(typeId: number): Promise<SystemServiceDto[]> {
    const systemServices = await this.prisma.systemService.findMany({
      where: {
        systemServiceTypeId: typeId,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return systemServices;
  }

  async findAdditionalService(
    hotelId?: number,
    availabilityId?: number,
  ): Promise<SystemServiceDto[]> {
    // Получаем все additional services
    const allServices = await this.prisma.systemService.findMany({
      where: {
        isAdditional: true,
      },
      orderBy: {
        name: 'asc',
      },
    });

    // Если hotelId или availabilityId не указан - возвращаем все
    if (!hotelId || !availabilityId) {
      return allServices;
    }

    // Проверяем есть ли у отеля HotelFood с offerType "Delivery"
    const hasDeliveryFood = await this.prisma.hotelFood.findFirst({
      where: {
        hotelId: Number(hotelId),
        hotelFoodOfferTypes: {
          some: {
            offerType: {
              name: {
                contains: 'Delivery',
                mode: 'insensitive',
              },
            },
          },
        },
      },
    });

    // Проверяем есть ли в этом конкретном availability HotelAgeAssignment с bedType "Cradle"
    const hasCradle = await this.prisma.hotelAgeAssignment.findFirst({
      where: {
        hotelAvailabilityId: Number(availabilityId),
        hotelAvailability: {
          hotelId: Number(hotelId),
        },
        bedType: 'Cradle',
      },
    });

    // Фильтруем services:
    // - FoodDelivery только если есть delivery food
    // - ProvisionOfACrib только если есть cradle bedType
    return allServices.filter((service) => {
      if (service.name === 'FoodDelivery') return !!hasDeliveryFood;
      if (service.name === 'ProvisionOfACrib') return !!hasCradle;
      return false; // Остальные не показываем
    });
  }
}
