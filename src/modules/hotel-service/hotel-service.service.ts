import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CompletenessStatus, HotelService } from '@prisma/client';

interface PaidServiceItem {
  hotelServiceId: number;
  hotelServiceAvailabilityId: number;
  systemServiceName: string;
  isPaid: boolean;
  startMonth: Date;
  endMonth: Date;
  hourlyAvailabilityType: string;
  startHour: Date | null;
  endHour: Date | null;
  currentPrice: {
    id: number;
    price: string;
    dateFrom: Date;
    dateTo: Date;
  } | null;
}

interface PaidServiceType {
  typeId: number;
  typeName: string;
  services: PaidServiceItem[];
}

interface PaidServiceGroup {
  groupId: number;
  groupName: string;
  types: PaidServiceType[];
}

@Injectable()
export class HotelServiceService {
  constructor(private prisma: PrismaService) {}

  async findByHotelId(
    hotelId: number,
    serviceTypeId: number,
  ): Promise<HotelService[]> {
    return await this.prisma.hotelService.findMany({
      where: {
        hotelId,
        service: {
          systemServiceTypeId: serviceTypeId ?? undefined,
        },
      },
      include: {
        service: {
          select: {
            name: true,
          },
        },
        hotelServiceAvailabilities: true,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async createHotelService(
    hotelId: number,
    serviceId: number,
    statusId: CompletenessStatus = CompletenessStatus.Draft,
  ) {
    return await this.prisma.hotelService.create({
      data: {
        hotelId,
        serviceId,
        statusId,
      },
    });
  }

  async deleteHotelService(hotelServiceId: number): Promise<HotelService> {
    return await this.prisma.$transaction(async (tx) => {
      // Удаляем связанные записи в правильном порядке
      await tx.orderHotelService.deleteMany({
        where: { hotelServiceId },
      });

      await tx.hotelAdditionalService.deleteMany({
        where: { hotelServiceId },
      });

      await tx.hotelServicePrice.deleteMany({
        where: { hotelServiceId },
      });

      await tx.hotelServiceAvailability.deleteMany({
        where: { hotelServiceId },
      });

      return await tx.hotelService.delete({
        where: { id: hotelServiceId },
      });
    });
  }

  async getPaidServicesGrouped(
    hotelId: number,
    availabilityId: number,
  ): Promise<PaidServiceGroup[]> {
    const hotelServices = await this.prisma.hotelService.findMany({
      where: {
        hotelId,
        hotelServiceAvailabilities: {
          some: {
            isPaid: true,
          },
        },
      },
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
        hotelServiceAvailabilities: {
          where: {
            isPaid: true,
          },
        },
        hotelServicePrices: {
          where: {
            hotelAvailabilityId: availabilityId,
          },
        },
      },
    });

    interface GroupedData {
      id: number;
      name: string;
      types: Record<
        number,
        {
          id: number;
          name: string;
          services: PaidServiceItem[];
        }
      >;
    }

    const grouped = hotelServices.reduce(
      (acc: Record<number, GroupedData>, hotelService) => {
        const group = hotelService.service.systemServiceType.systemServiceGroup;
        const type = hotelService.service.systemServiceType;

        if (!acc[group.id]) {
          acc[group.id] = {
            id: group.id,
            name: group.name,
            types: {},
          };
        }

        if (!acc[group.id].types[type.id]) {
          acc[group.id].types[type.id] = {
            id: type.id,
            name: type.name,
            services: [],
          };
        }

        hotelService.hotelServiceAvailabilities.forEach((availability) => {
          const currentPrice = hotelService.hotelServicePrices.find(
            (price) => price.hotelServiceId === hotelService.id,
          );

          acc[group.id].types[type.id].services.push({
            hotelServiceId: hotelService.id,
            hotelServiceAvailabilityId: availability.id,
            systemServiceName: hotelService.service.name,
            isPaid: availability.isPaid,
            startMonth: availability.startMonth,
            endMonth: availability.endMonth,
            hourlyAvailabilityType: availability.hourlyAvailabilityTypeId,
            startHour: availability.startHour,
            endHour: availability.endHour,
            currentPrice: currentPrice
              ? {
                  id: currentPrice.id,
                  price: currentPrice.price.toString(),
                  dateFrom: currentPrice.dateFrom,
                  dateTo: currentPrice.dateTo,
                }
              : null,
          });
        });

        return acc;
      },
      {},
    );

    return Object.values(grouped).map((group) => ({
      groupId: group.id,
      groupName: group.name,
      types: Object.values(group.types).map((type) => ({
        typeId: type.id,
        typeName: type.name,
        services: type.services,
      })),
    }));
  }

  async getServicesCounts(hotelId: number) {
    // Получаем все сервисы отеля с их availability
    const hotelServices = await this.prisma.hotelService.findMany({
      where: {
        hotelId,
        deletedAt: null,
      },
      include: {
        hotelServiceAvailabilities: true,
      },
    });

    let paidCount = 0;
    let freeCount = 0;

    // Проходим по каждому сервису и проверяем его availability
    hotelServices.forEach((service) => {
      // Если у сервиса есть хотя бы один availability
      if (
        service.hotelServiceAvailabilities &&
        service.hotelServiceAvailabilities.length > 0
      ) {
        // Проверяем, есть ли хотя бы один платный availability
        const hasPaid = service.hotelServiceAvailabilities.some(
          (avail) => avail.isPaid === true,
        );
        // Проверяем, есть ли хотя бы один бесплатный availability
        const hasFree = service.hotelServiceAvailabilities.some(
          (avail) => avail.isPaid === false,
        );

        if (hasPaid) paidCount++;
        if (hasFree) freeCount++;
      }
    });

    return {
      paidCount,
      freeCount,
    };
  }
}
