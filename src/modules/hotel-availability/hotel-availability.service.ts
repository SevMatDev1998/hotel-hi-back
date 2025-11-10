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
  ) {}

  async create(
    createHotelAvailabilityDto: CreateHotelAvailabilityDto,
    hotelId: number,
  ): Promise<HotelAvailability> {
    const { title, checkInTime, checkoutTime, hotelAgeAssignments } =
      createHotelAvailabilityDto;

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
        hotelAvailabilityDateCommissions: true,
      },
    });
  }

  async updateByHotelIdWithDates(
    hotelId: number,
    dto: UpdateHotelAvailabilityListDto,
  ): Promise<HotelAvailability[]> {
    const { availability, commissionDate } = dto; // ← ОДИН объект

    if (!availability || !availability.id) {
      // throw new BadRequestException('Availability data is required');
      console.log(1234567);
    }

    try {
      await this.prisma.$transaction(async (tx) => {
        // 1️⃣ Получаем существующие даты из БД для этого availability
        const existingDates = await tx.hotelAvailabilityDateCommission.findMany(
          {
            where: { hotelAvailabilityId: availability.id },
          },
        );

        const existingCalendarIds = existingDates.map((d) => d.calendarId);
        const newCalendarIds =
          availability.hotelAvailabilityDateCommissions.map(
            (d) => d.calendarId,
          );

        // 2️⃣ Что удалить (были в БД, но больше нет в новом списке)
        const toDelete = existingCalendarIds.filter(
          (id) => !newCalendarIds.includes(id),
        );

        // 3️⃣ Что обновить (есть и в БД и в новом списке)
        const toUpdate = newCalendarIds.filter((id) =>
          existingCalendarIds.includes(id),
        );

        // 4️⃣ Что создать (новые, которых не было в БД)
        const toCreate = newCalendarIds.filter(
          (id) => !existingCalendarIds.includes(id),
        );

        // 🗑️ УДАЛЯЕМ старые даты
        if (toDelete.length > 0) {
          await tx.hotelAvailabilityDateCommission.deleteMany({
            where: {
              hotelAvailabilityId: availability.id,
              calendarId: { in: toDelete },
            },
          });
        }

        // ✏️ ОБНОВЛЯЕМ существующие даты (новые комиссии)
        if (toUpdate.length > 0 && commissionDate) {
          for (const calendarId of toUpdate) {
            await tx.hotelAvailabilityDateCommission.updateMany({
              where: {
                hotelAvailabilityId: availability.id,
                calendarId: calendarId,
              },
              data: {
                roomFee: commissionDate.roomFee ?? 0,
                foodFee: commissionDate.foodFee ?? 0,
                additionalFee: commissionDate.additionalFee ?? 0,
                serviceFee: commissionDate.serviceFee ?? 0,
                updatedAt: new Date(),
              },
            });
          }
        }

        // ➕ СОЗДАЕМ новые даты
        if (toCreate.length > 0) {
          const newDates = availability.hotelAvailabilityDateCommissions
            .filter((d) => toCreate.includes(d.calendarId))
            .map((d) => ({
              hotelAvailabilityId: availability.id,
              date: new Date(d.date),
              calendarId: d.calendarId,
              roomFee: commissionDate?.roomFee ?? 0,
              foodFee: commissionDate?.foodFee ?? 0,
              additionalFee: commissionDate?.additionalFee ?? 0,
              serviceFee: commissionDate?.serviceFee ?? 0,
              startDate: new Date(),
              endDate: null,
              createdAt: new Date(),
              updatedAt: new Date(),
            }));

          await tx.hotelAvailabilityDateCommission.createMany({
            data: newDates,
            skipDuplicates: true,
          });
        }

        // 🔄 Обновляем основные данные availability (если нужно)
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
      });

      // 5️⃣ Возвращаем ВСЕ availability для этого отеля (обновленные)
      const updated = await this.prisma.hotelAvailability.findMany({
        where: { hotelId },
        include: {
          hotelAvailabilityDateCommissions: true,
        },
        orderBy: { id: 'asc' },
      });

      return updated;
    } catch (error) {
      console.error('Error updating hotel availability with dates:', error);
      throw error;
    }
  }

  async deleteDate(
    calendarId: string,
  ): Promise<{ success: boolean; message: string }> {
    try {
      await this.prisma.hotelAvailabilityDateCommission.deleteMany({
        where: { calendarId },
      });

      return {
        success: true,
        message: `Date with calendarId ${calendarId} deleted successfully`,
      };
    } catch (error) {
      console.error('Error deleting date:', error);
      throw error;
    }
  }

  async deleteDatesBatch(
    calendarIds: string[],
  ): Promise<{ success: boolean; message: string; count: number }> {
    try {
      const result =
        await this.prisma.hotelAvailabilityDateCommission.deleteMany({
          where: {
            calendarId: { in: calendarIds },
          },
        });

      return {
        success: true,
        message: `${result.count} dates deleted successfully`,
        count: result.count,
      };
    } catch (error) {
      console.error('Error deleting dates batch:', error);
      throw error;
    }
  }
}
