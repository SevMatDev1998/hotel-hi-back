import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRoomPricePolicyDto } from './dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class RoomPricePolicyService {
  private readonly logger = new Logger(RoomPricePolicyService.name);

  constructor(private readonly prisma: PrismaService) {}

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

        const createdFoodPrices = await Promise.all(
          dto.foodPrices.map((foodPrice) =>
            tx.hotelFoodPrice.create({
              data: {
                hotelAvailabilityId: foodPrice.hotelAvailabilityId,
                hotelFoodId: foodPrice.hotelFoodId,
                hotelAgeAssignmentId: foodPrice.includedInPrice
                  ? null
                  : foodPrice.hotelAgeAssignmentId,
                price: new Decimal(foodPrice.price),
                includedInPrice: foodPrice.includedInPrice,
              },
            }),
          ),
        );

        this.logger.log(
          `Created ${createdFoodPrices.length} food price records`,
        );

        const createdRoomPrice = await tx.hotelRoomPrice.create({
          data: {
            hotelRoomId: dto.roomPrice.hotelRoomId,
            hotelAvailabilityId: dto.roomPrice.hotelAvailabilityId,
            price: new Decimal(dto.roomPrice.price),
            dateFrom: new Date(),
            dateTo: new Date(),
          },
        });

        this.logger.log(
          `Created room price record for room ID: ${dto.roomPrice.hotelRoomId}`,
        );

        const createdArrivalDepartureServices = await Promise.all(
          dto.arrivalDepartureServices.map((service) => {
            const hotelServiceId = serviceMap.get(service.systemServiceId);
            if (!hotelServiceId) {
              throw new Error(
                `Hotel service not found for system service ID ${service.systemServiceId}`,
              );
            }
            return tx.hotelAdditionalService.create({
              data: {
                hotelServiceId: hotelServiceId,
                hotelAvailabilityId: service.hotelAvailabilityId,
                hotelRoomId: service.hotelRoomId || null,
                isTimeLimited: service.isTimeLimited,
                startTime: service.startTime
                  ? new Date(service.startTime)
                  : null,
                percentage: service.percentage || null,
                price: service.price ? new Decimal(service.price) : null,
                notConstantValue: service.notConstantValue || false,
                serviceName: service.serviceName,
              },
            });
          }),
        );

        this.logger.log(
          `Created ${createdArrivalDepartureServices.length} arrival/departure service records`,
        );

        const createdOtherServices = await Promise.all(
          dto.otherServices.map((service) => {
            const hotelServiceId = serviceMap.get(service.systemServiceId);
            if (!hotelServiceId) {
              throw new Error(
                `Hotel service not found for system service ID ${service.systemServiceId}`,
              );
            }
            return tx.hotelAdditionalService.create({
              data: {
                hotelServiceId: hotelServiceId,
                hotelAvailabilityId: service.hotelAvailabilityId,
                hotelRoomId: service.hotelRoomId || null,
                isTimeLimited: service.isTimeLimited,
                startTime: null,
                percentage: null,
                price:
                  service.price !== null ? new Decimal(service.price) : null,
                notConstantValue: service.notConstantValue,
                serviceName: service.serviceName,
              },
            });
          }),
        );

        this.logger.log(
          `Created ${createdOtherServices.length} other service records`,
        );

        return {
          foodPrices: createdFoodPrices,
          roomPrice: createdRoomPrice,
          arrivalDepartureServices: createdArrivalDepartureServices,
          otherServices: createdOtherServices,
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
          createdRoomPrice: 1,
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
      where: { id: dto.roomPrice.hotelRoomId },
    });

    if (!hotelRoom) {
      errors.push(`Hotel room with id ${dto.roomPrice.hotelRoomId} not found`);
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

    const invalidPrices = [
      ...dto.foodPrices.filter((fp) => fp.price < 0),
      ...dto.arrivalDepartureServices.filter(
        (s) => s.price !== undefined && s.price < 0,
      ),
      ...dto.otherServices.filter((s) => s.price !== null && s.price < 0),
    ];

    if (invalidPrices.length > 0) {
      errors.push('Price must be greater than or equal to 0');
    }

    if (dto.roomPrice.price < 0) {
      errors.push('Room price must be greater than or equal to 0');
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
}
