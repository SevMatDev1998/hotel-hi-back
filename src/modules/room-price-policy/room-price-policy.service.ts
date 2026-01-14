import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoomPricePolicyDto } from './dto';
import { HotelFoodPriceService } from '../hotel-food-price/hotel-food-price.service';
import { HotelRoomPriceService } from '../hotel-room-price/hotel-room-price.service';
import { HotelAdditionalServiceService } from '../hotel-additional-service/hotel-additional-service.service';
import { HotelServiceService } from '../hotel-service/hotel-service.service';
import { HotelAgeAssignmentPriceService } from '../hotel-age-assignment-price/hotel-age-assignment-price.service';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class RoomPricePolicyService {
  private readonly logger = new Logger(RoomPricePolicyService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly hotelFoodPriceService: HotelFoodPriceService,
    private readonly hotelRoomPriceService: HotelRoomPriceService,
    private readonly hotelAdditionalServiceService: HotelAdditionalServiceService,
    private readonly hotelServiceService: HotelServiceService,
    private readonly hotelAgeAssignmentPriceService: HotelAgeAssignmentPriceService,
  ) {}

  async createRoomPricePolicy(dto: CreateRoomPricePolicyDto) {
    this.logger.log(
      `Creating price policy for hotel availability ID: ${dto.hotelAvailabilityId}`,
    );

    // Сначала валидация и получение hotelId
    const hotelId = await this.validatePricePolicyData(dto);

    try {
      const result = await this.prisma.$transaction(async (tx) => {
        // Найти или создать все HotelService по systemServiceId и hotelId
        const systemServiceIds = [
          ...dto.arrivalDepartureServices.map((s) => s.systemServiceId),
          ...dto.otherServices.map((s) => s.systemServiceId),
        ];

        // Получаем существующие HotelService
        const existingHotelServices = await tx.hotelService.findMany({
          where: {
            hotelId: hotelId,
            serviceId: { in: systemServiceIds },
          },
        });

        // Создаем map существующих сервисов
        const serviceMap = new Map(
          existingHotelServices.map((hs) => [hs.serviceId, hs.id]),
        );

        // Находим systemServiceIds для которых нет HotelService
        const missingServiceIds = systemServiceIds.filter(
          (id) => !serviceMap.has(id),
        );

        // Создаем HotelService для отсутствующих
        if (missingServiceIds.length > 0) {
          this.logger.log(
            `Creating ${missingServiceIds.length} new hotel services for system service ids: [${missingServiceIds.join(', ')}]`,
          );

          const createdServices = await Promise.all(
            missingServiceIds.map((systemServiceId) =>
              tx.hotelService.create({
                data: {
                  hotelId: hotelId,
                  serviceId: systemServiceId,
                  statusId: 'Draft',
                  description: null,
                },
              }),
            ),
          );

          // Добавляем созданные сервисы в map
          createdServices.forEach((hs) => {
            serviceMap.set(hs.serviceId, hs.id);
          });
        }

        // Создаем food prices используя сервис
        const foodPriceDtos = dto.foodPrices.map((foodPrice) => ({
          hotelAvailabilityId: foodPrice.hotelAvailabilityId,
          hotelFoodId: foodPrice.hotelFoodId,
          hotelRoomId: foodPrice.hotelRoomId,
          hotelAgeAssignmentId: foodPrice.includedInPrice
            ? undefined
            : foodPrice.hotelAgeAssignmentId,
          price: foodPrice.price,
          includedInPrice: foodPrice.includedInPrice,
        }));

        const createdFoodPrices = await this.hotelFoodPriceService.createMany(
          tx,
          foodPriceDtos,
        );

        this.logger.log(
          `Created ${createdFoodPrices.length} food price records`,
        );

        await tx.hotelRoomPrice.deleteMany({
          where: {
            hotelRoomId: dto.roomPrices[0]?.hotelRoomId,
            hotelAvailabilityId: dto.hotelAvailabilityId,
          },
        });

        await tx.hotelFoodPrice.deleteMany({
          where: {
            hotelRoomId: dto.roomPrices[0]?.hotelRoomId,
            hotelAvailabilityId: dto.hotelAvailabilityId,
          },
        });

        await tx.hotelAdditionalService.deleteMany({
          where: {
            hotelRoomId: dto.roomPrices[0]?.hotelRoomId,
            hotelAvailabilityId: dto.hotelAvailabilityId,
          },
        });

        // await tx.hotelAgeAssignmentPrice.deleteMany({
        //   where: {
        //     hotelRoomId: dto.roomPrices[0]?.hotelRoomId,
        //   },
        // });

        this.logger.log(
          `Deleted old price data for room ID: ${dto.roomPrices[0]?.hotelRoomId}`,
        );

        // Создаем новые room prices
        const createdRoomPrices = await Promise.all(
          dto.roomPrices.map((roomPrice) =>
            tx.hotelRoomPrice.create({
              data: {
                hotelRoomId: roomPrice.hotelRoomId,
                hotelAvailabilityId: roomPrice.hotelAvailabilityId,
                guestCount: roomPrice.guestCount,
                price: new Decimal(roomPrice.price),
                dateFrom: new Date(),
                dateTo: new Date(),
              },
            }),
          ),
        );

        this.logger.log(
          `Created ${createdRoomPrices.length} room price records`,
        );

        const createdAgeAssignmentPrices =
          await this.hotelAgeAssignmentPriceService.createMany(
            tx,
            dto.hotelAgeAssignmentPrices,
          );

        this.logger.log(
          `Created ${createdAgeAssignmentPrices.length} age assignment price records`,
        );

        // Объединяем arrival/departure и other services для одновременной обработки
        const allServiceDtos = [
          ...dto.arrivalDepartureServices.map((service) => {
            const hotelServiceId = serviceMap.get(service.systemServiceId);
            if (!hotelServiceId) {
              throw new Error(
                `Hotel service not found for system service ID ${service.systemServiceId}`,
              );
            }
            return {
              hotelServiceId,
              hotelAvailabilityId: service.hotelAvailabilityId,
              hotelRoomId: service.hotelRoomId,
              isTimeLimited: service.isTimeLimited,
              startTime: service.startTime,
              percentage: service.percentage,
              price: service.price,
              notConstantValue: service.notConstantValue,
              serviceName: service.serviceName,
            };
          }),
          ...dto.otherServices.map((service) => {
            const hotelServiceId = serviceMap.get(service.systemServiceId);
            if (!hotelServiceId) {
              throw new Error(
                `Hotel service not found for system service ID ${service.systemServiceId}`,
              );
            }
            return {
              hotelServiceId,
              hotelAvailabilityId: service.hotelAvailabilityId,
              hotelRoomId: service.hotelRoomId,
              isTimeLimited: service.isTimeLimited,
              startTime: undefined,
              percentage: undefined,
              price: service.price !== null ? service.price : undefined,
              notConstantValue: service.notConstantValue,
              serviceName: service.serviceName,
            };
          }),
        ];

        // Создаем все additional services за один раз
        const createdAdditionalServices =
          await this.hotelAdditionalServiceService.createMany(
            tx,
            allServiceDtos,
          );

        this.logger.log(
          `Created ${createdAdditionalServices.length} additional service records`,
        );

        // Разделяем обратно для возврата результата
        const arrivalDepartureCount = dto.arrivalDepartureServices.length;
        const arrivalDepartureServices = createdAdditionalServices.slice(
          0,
          arrivalDepartureCount,
        );
        const otherServices = createdAdditionalServices.slice(
          arrivalDepartureCount,
        );

        return {
          foodPrices: createdFoodPrices,
          roomPrices: createdRoomPrices,
          ageAssignmentPrices: createdAgeAssignmentPrices,
          arrivalDepartureServices: arrivalDepartureServices,
          otherServices: otherServices,
        };
      });

      this.logger.log(
        `Successfully created price policy for availability ID: ${dto.hotelAvailabilityId}`,
      );

      return {
        success: true,
        message: 'Price policy created successfully',
        data: {
          hotelAvailabilityId: dto.hotelAvailabilityId,
          createdFoodPrices: result.foodPrices.length,
          createdRoomPrices: result.roomPrices.length,
          createdAgeAssignmentPrices: result.ageAssignmentPrices.length,
          createdAdditionalServices:
            result.arrivalDepartureServices.length +
            result.otherServices.length,
        },
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : undefined;

      this.logger.error(
        `Failed to create price policy: ${errorMessage}`,
        errorStack,
      );
      throw new BadRequestException(
        `Failed to create price policy: ${errorMessage}`,
      );
    }
  }

  async getRoomPricePolicy(hotelAvailabilityId: number, hotelRoomId: number) {
    this.logger.log(
      `Getting price policy for availability ID: ${hotelAvailabilityId}, room ID: ${hotelRoomId}`,
    );

    try {
      const hotelAvailability = await this.prisma.hotelAvailability.findUnique({
        where: { id: hotelAvailabilityId },
      });

      if (!hotelAvailability) {
        throw new BadRequestException(
          `Hotel availability with id ${hotelAvailabilityId} not found`,
        );
      }

      const hotelRoom = await this.prisma.hotelRoom.findUnique({
        where: { id: hotelRoomId },
      });

      if (!hotelRoom) {
        throw new BadRequestException(
          `Hotel room with id ${hotelRoomId} not found`,
        );
      }

      // Получаем food prices
      const foodPrices = await this.prisma.hotelFoodPrice.findMany({
        where: {
          hotelAvailabilityId: hotelAvailabilityId,
          hotelRoomId: hotelRoomId,
        },
      });

      // Получаем room prices
      const roomPrices = await this.prisma.hotelRoomPrice.findMany({
        where: {
          hotelRoomId: hotelRoomId,
          hotelAvailabilityId: hotelAvailabilityId,
        },
        orderBy: {
          guestCount: 'asc',
        },
      });

      const ageAssignmentPrices =
        await this.prisma.hotelAgeAssignmentPrice.findMany({
          where: {
            hotelRoomId: hotelRoomId,
          },
        });

      // Получаем все additional services для этой комнаты и availability
      const allAdditionalServices =
        await this.prisma.hotelAdditionalService.findMany({
          where: {
            hotelAvailabilityId: hotelAvailabilityId,
            hotelRoomId: hotelRoomId,
          },
          include: {
            hotelService: {
              include: {
                service: true,
              },
            },
          },
        });

      // Разделяем на arrival/departure и other services
      const arrivalDepartureServices = allAdditionalServices
        .filter((s) => s.isTimeLimited && s.percentage !== null)
        .map((s) => ({
          id: s.id,
          systemServiceId: s.hotelService.serviceId,
          hotelAvailabilityId: s.hotelAvailabilityId,
          hotelRoomId: s.hotelRoomId,
          isTimeLimited: s.isTimeLimited,
          startTime: s.startTime,
          percentage: s.percentage,
          serviceName: s.serviceName,
          price: s.price,
          notConstantValue: s.notConstantValue,
          createdAt: s.createdAt,
          updatedAt: s.updatedAt,
        }));

      const otherServices = allAdditionalServices
        .filter((s) => !s.isTimeLimited || s.percentage === null)
        .map((s) => ({
          id: s.id,
          systemServiceId: s.hotelService.serviceId,
          hotelAvailabilityId: s.hotelAvailabilityId,
          hotelRoomId: s.hotelRoomId,
          price: s.price,
          notConstantValue: s.notConstantValue,
          serviceName: s.serviceName,
          isTimeLimited: s.isTimeLimited,
          createdAt: s.createdAt,
          updatedAt: s.updatedAt,
        }));

      return {
        success: true,
        data: {
          hotelAvailabilityId,
          hotelRoomId,
          foodPrices,
          roomPrices,
          ageAssignmentPrices,
          arrivalDepartureServices,
          otherServices,
        },
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      this.logger.error(
        `Failed to get price policy: ${errorMessage}`,
        error instanceof Error ? error.stack : undefined,
      );
      throw new BadRequestException(
        `Failed to get price policy: ${errorMessage}`,
      );
    }
  }

  private async validatePricePolicyData(
    dto: CreateRoomPricePolicyDto,
  ): Promise<number> {
    const errors: string[] = [];

    const hotelAvailability = await this.prisma.hotelAvailability.findUnique({
      where: { id: dto.hotelAvailabilityId },
      include: { hotel: true },
    });

    if (!hotelAvailability) {
      errors.push(
        `Hotel availability with id ${dto.hotelAvailabilityId} not found`,
      );
      throw new BadRequestException({
        success: false,
        message: 'Validation error',
        errors,
      });
    }

    const hotelId = hotelAvailability.hotelId;

    const hotelRoom = await this.prisma.hotelRoom.findUnique({
      where: { id: dto.roomPrices[0]?.hotelRoomId },
    });

    if (!hotelRoom) {
      errors.push(`Hotel room with id ${dto.roomPrices[0]?.hotelRoomId} not found`);
    }

    const hotelFoodIds = dto.foodPrices.map((fp) => fp.hotelFoodId);
    const existingFoods = await this.prisma.hotelFood.findMany({
      where: { id: { in: hotelFoodIds } },
    });

    const missingFoodIds = hotelFoodIds.filter(
      (id) => !existingFoods.find((f) => f.id === id),
    );

    if (missingFoodIds.length > 0) {
      errors.push(
        `Hotel foods with ids [${missingFoodIds.join(', ')}] not found`,
      );
    }

    // Проверка существования SystemService (HotelService будут созданы автоматически)
    const systemServiceIds = [
      ...dto.arrivalDepartureServices.map((s) => s.systemServiceId),
      ...dto.otherServices.map((s) => s.systemServiceId),
    ];

    const existingSystemServices = await this.prisma.systemService.findMany({
      where: { id: { in: systemServiceIds } },
    });

    const missingSystemServiceIds = systemServiceIds.filter(
      (id) => !existingSystemServices.find((s) => s.id === id),
    );

    if (missingSystemServiceIds.length > 0) {
      errors.push(
        `System services with ids [${missingSystemServiceIds.join(', ')}] not found`,
      );
    }

    const ageAssignmentIds = dto.foodPrices
      .filter((fp) => !fp.includedInPrice && fp.hotelAgeAssignmentId)
      .map((fp) => fp.hotelAgeAssignmentId as number);

    if (ageAssignmentIds.length > 0) {
      const existingAssignments = await this.prisma.hotelAgeAssignment.findMany(
        {
          where: { id: { in: ageAssignmentIds } },
        },
      );

      const missingAssignmentIds = ageAssignmentIds.filter(
        (id) => !existingAssignments.find((a) => a.id === id),
      );

      if (missingAssignmentIds.length > 0) {
        errors.push(
          `Hotel age assignments with ids [${missingAssignmentIds.join(', ')}] not found`,
        );
      }
    }

    const missingAgeAssignments = dto.foodPrices.filter(
      (fp) => !fp.includedInPrice && !fp.hotelAgeAssignmentId,
    );

    if (missingAgeAssignments.length > 0) {
      errors.push(
        'Hotel age assignment ID is required for food prices not included in price',
      );
    }

    const invalidPercentages = dto.arrivalDepartureServices.filter(
      (s) => s.percentage && (s.percentage < 0 || s.percentage > 100),
    );

    if (invalidPercentages.length > 0) {
      errors.push('Percentage must be between 0 and 100');
    }

    const hotelAgeAssignmentPriceAgeIds = dto.hotelAgeAssignmentPrices.map(
      (p) => p.hotelAgeAssignmentId,
    );

    if (hotelAgeAssignmentPriceAgeIds.length > 0) {
      const existingAgeAssignments =
        await this.prisma.hotelAgeAssignment.findMany({
          where: { id: { in: hotelAgeAssignmentPriceAgeIds } },
        });

      const missingAgeAssignmentIds = hotelAgeAssignmentPriceAgeIds.filter(
        (id) => !existingAgeAssignments.find((a) => a.id === id),
      );

      if (missingAgeAssignmentIds.length > 0) {
        errors.push(
          `Hotel age assignments with ids [${missingAgeAssignmentIds.join(', ')}] not found for age assignment prices`,
        );
      }
    }

    const invalidPrices = [
      ...dto.foodPrices.filter((fp) => fp.price < 0),
      ...dto.arrivalDepartureServices.filter(
        (s) => s.price !== undefined && s.price < 0,
      ),
      ...dto.otherServices.filter((s) => s.price !== null && s.price < 0),
      ...dto.hotelAgeAssignmentPrices.filter((p) => p.price < 0),
    ];

    if (invalidPrices.length > 0) {
      errors.push('Price must be greater than or equal to 0');
    }

    const invalidRoomPrices = dto.roomPrices.filter((rp) => rp.price < 0);
    if (invalidRoomPrices.length > 0) {
      errors.push('Room price must be greater than or equal to 0');
    }

    const invalidGuestCounts = dto.roomPrices.filter((rp) => rp.guestCount < 1);
    if (invalidGuestCounts.length > 0) {
      errors.push('Guest count must be greater than 0');
    }

    if (errors.length > 0) {
      throw new BadRequestException({
        success: false,
        message: 'Validation error',
        errors,
      });
    }

    return hotelId;
  }

  async toggleRoomPricePolicyStatus(
    hotelAvailabilityId: number,
    hotelRoomId: number,
    isActive: boolean,
  ) {
    this.logger.log(
      `Toggling price policy status for availability ID: ${hotelAvailabilityId}, room ID: ${hotelRoomId}, isActive: ${isActive}`,
    );

    try {
      await this.prisma.$transaction(async (tx) => {
        // Update HotelRoomPrice
        await tx.hotelRoomPrice.updateMany({
          where: {
            hotelRoomId: hotelRoomId,
            hotelAvailabilityId: hotelAvailabilityId,
          },
          data: {
            isActive: isActive,
            updatedAt: new Date(),
          },
        });

        // Update HotelFoodPrice
        await tx.hotelFoodPrice.updateMany({
          where: {
            hotelRoomId: hotelRoomId,
            hotelAvailabilityId: hotelAvailabilityId,
          },
          data: {
            isActive: isActive,
            updatedAt: new Date(),
          },
        });

        // Update HotelAdditionalService
        await tx.hotelAdditionalService.updateMany({
          where: {
            hotelRoomId: hotelRoomId,
            hotelAvailabilityId: hotelAvailabilityId,
          },
          data: {
            isActive: isActive,
            updatedAt: new Date(),
          },
        });

        // Update HotelAgeAssignmentPrice
        await tx.hotelAgeAssignmentPrice.updateMany({
          where: {
            hotelRoomId: hotelRoomId,
          },
          data: {
            isActive: isActive,
            updatedAt: new Date(),
          },
        });
      });

      return {
        success: true,
        message: `Price policy ${isActive ? 'activated' : 'deactivated'} successfully`,
      };
    } catch (error) {
      this.logger.error('Error toggling price policy status:', error);
      throw error;
    }
  }
}
