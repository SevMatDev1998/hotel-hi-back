import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { HotelServiceService } from '../hotel-service/hotel-service.service';
import { AvailabilityGroupDto, CreateHotelServiceAvailabilityDto } from './dto';

@Injectable()
export class HotelServiceAvailabilityService {
  constructor(
    private prisma: PrismaService,
    private hotelServiceService: HotelServiceService,
  ) {}

  async createHotelServiceWithAvailabilities(
    hotelServiceId: number,
    createDto: CreateHotelServiceAvailabilityDto,
  ) {
    const { availabilities } = createDto;

    // 1. Check if HotelService exists
    const hotelService = await this.prisma.hotelService.findUnique({
      where: { id: hotelServiceId },
    });

    if (!hotelService) {
      throw new Error(`HotelService with ID ${hotelServiceId} not found.`);
    }

    // 2. Delete old records
    await this.prisma.hotelServiceAvailability.deleteMany({
      where: { hotelServiceId },
    });

    // 3. Flatten and create new
    const recordsToCreate = availabilities
      .filter((g) => g.isActive)
      .flatMap((g) =>
        g.periods.map((period) => ({
          hotelServiceId,
          isPaid: g.isPaid ?? false,
          startMonth: new Date(period.startMonth),
          endMonth: new Date(period.endMonth),
          hourlyAvailabilityTypeId: period.hourlyAvailabilityTypeId,
          startHour:
            period.hourlyAvailabilityTypeId === 'Hours'
              ? period.startHour
                ? new Date(`1970-01-01T${period.startHour}:00`)
                : null
              : null,
          endHour:
            period.hourlyAvailabilityTypeId === 'Hours'
              ? period.endHour
                ? new Date(`1970-01-01T${period.endHour}:00`)
                : null
              : null,
        })),
      );

    const createdAvailabilities =
      await this.prisma.hotelServiceAvailability.createMany({
        data: recordsToCreate,
      });

    return {
      hotelService,
      created: createdAvailabilities.count,
    };
  }

  async findByhotelServiceId(
    hotelServiceId: number,
  ): Promise<{ availabilities: AvailabilityGroupDto[] }> {
    const rows = await this.prisma.hotelServiceAvailability.findMany({
      where: { hotelServiceId },
      orderBy: { startMonth: 'asc' },
    });

    if (!rows.length) {
      return { availabilities: [] };
    }

    const grouped: AvailabilityGroupDto[] = [
      {
        isPaid: true,
        isActive: rows.some((r) => r.isPaid === true),
        periods: rows
          .filter((r) => r.isPaid === true)
          .map((r) => ({
            startMonth: r.startMonth.toISOString().slice(0, 10),
            endMonth: r.endMonth.toISOString().slice(0, 10),
            hourlyAvailabilityTypeId: r.hourlyAvailabilityTypeId,
            startHour: r.startHour
              ? r.startHour.toISOString().slice(11, 16)
              : undefined,
            endHour: r.endHour
              ? r.endHour.toISOString().slice(11, 16)
              : undefined,
          })),
      },
      {
        isPaid: false,
        isActive: rows.some((r) => r.isPaid === false),
        periods: rows
          .filter((r) => r.isPaid === false)
          .map((r) => ({
            startMonth: r.startMonth.toISOString().slice(0, 10),
            endMonth: r.endMonth.toISOString().slice(0, 10),
            hourlyAvailabilityTypeId: r.hourlyAvailabilityTypeId,
            startHour: r.startHour
              ? r.startHour.toISOString().slice(11, 16)
              : undefined,
            endHour: r.endHour
              ? r.endHour.toISOString().slice(11, 16)
              : undefined,
          })),
      },
    ];

    return { availabilities: grouped };
  }
}
