import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHotelAvailabilityDto } from './dto/create-hotel-availability.dto';
import { HotelAvailability } from '@prisma/client';
import { HotelAgeAssignmentService } from '../hotel-age-assignment/hotel-age-assignment.service';
import { UpdateHotelAvailabilityListDto } from './dto/update-hotel-availability-with-dates.dto';

@Injectable()
export class HotelAvailabilityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly hotelAgeAssignmentService: HotelAgeAssignmentService,
  ) { }

  async create(
    createHotelAvailabilityDto: CreateHotelAvailabilityDto,
    hotelId: number,
  ): Promise<HotelAvailability> {
    const { title, checkInTime, checkoutTime, hotelAgeAssignments } = createHotelAvailabilityDto;

    const hotelAvailability = await this.prisma.hotelAvailability.create({
      data: {
        hotelId,
        title,
        color: '',
        // checkInTime: new Date(checkInTime),
        // checkoutTime: new Date(checkoutTime),
        checkInTime: new Date(),
        checkoutTime: new Date(),
      },
    });
    if (hotelAgeAssignments && hotelAgeAssignments.length > 0) {
      for (const assignment of hotelAgeAssignments) {
        await this.hotelAgeAssignmentService.create({
          ...assignment,
          hotelAvailabilityId: hotelAvailability.id,
        });
      }
    }

    return hotelAvailability;
  }


  async findByHotelId(hotelId: number): Promise<HotelAvailability[]> {
    return this.prisma.hotelAvailability.findMany({
      where: { hotelId },
    });
  }

  async findByHotelIdWithDates(hotelId: number): Promise<HotelAvailability[]> {
    return this.prisma.hotelAvailability.findMany({
      where: { hotelId },
      include: {
        dates: true,
      },
    });
  }

  async updateByHotelIdWithDates(
    hotelId: number,
    dto: UpdateHotelAvailabilityListDto,
  ): Promise<HotelAvailability[]> {
    const { availabilities } = dto;

    if (!availabilities || availabilities.length === 0) {
      // throw new NotFoundException('No availability data provided.');
    }

    try {
      await this.prisma.$transaction(async (tx) => {
        for (const availability of availabilities) {
          // 1️⃣ Проверка существования
          const existing = await tx.hotelAvailability.findFirst({
            where: { id: availability.id, hotelId },
          });

          if (!existing) {
            console.log(`HotelAvailability with id=${availability.id} not found for hotelId=${hotelId}`);
          }

          // 2️⃣ Удаляем все старые даты (чистим полностью перед обновлением)
          await tx.hotelAvailabilityDate.deleteMany({
            where: { hotelAvailabilityId: availability.id },
          });

          // 3️⃣ Обновляем основные поля
          await tx.hotelAvailability.update({
            where: { id: availability.id },
            data: {
              title: availability.title,
              color: availability.color,
              checkInTime: new Date(availability.checkInTime),
              checkoutTime: new Date(availability.checkoutTime),
              confirmed: availability.confirmed ?? false,
              updatedAt: new Date(),
            },
          });

          // 4️⃣ Создаём новые даты (bulk insert)
          if (availability.dates && availability.dates.length > 0) {
            const dateData = availability.dates.map((d) => ({
              hotelAvailabilityId: availability.id,
              date: new Date(d.date),
              calendarId: d.calendarId,
              startDate: new Date(),
              createdAt: new Date(),
              updatedAt: new Date(),
            }));

            await tx.hotelAvailabilityDate.createMany({
              data: dateData,
              skipDuplicates: true, // защита от повторных id/date
            });
          }
        }
      });

      // 5️⃣ После транзакции — возвращаем актуальные данные
      const updated = await this.prisma.hotelAvailability.findMany({
        where: { hotelId },
        include: {
          dates: true,
        },
        orderBy: { id: 'asc' },
      });

      return updated;
    } catch (error) {
      console.error('❌ Error updating hotel availability with dates:', error);
      throw error;
    }
  }

  async findDetailsByHotelId(hotelId: number): Promise<void> {
    const foods = await this.prisma.hotelFood.findMany({
      where: { hotelId },
    });
  }
}
