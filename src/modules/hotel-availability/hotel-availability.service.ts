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
    const { availabilities, commissionDate } = dto;

    if (!availabilities || availabilities.length === 0) {
      console.log('⚠️ No availability data provided for update.');
      //
      // throw new NotFoundException('No availability data provided.');
    }



    try {
      await this.prisma.$transaction(async (tx) => {
        for (const availability of availabilities) {
          // 1️⃣ Проверяем, существует ли запись availability
          const existing = await tx.hotelAvailability.findFirst({
            where: { id: availability.id, hotelId },
          });

          if (!existing) {
            console.warn(
              `⚠️ HotelAvailability with id=${availability.id} not found for hotelId=${hotelId}`,
            );
          }

          // 2️⃣ Удаляем старые даты комиссий перед обновлением
          await tx.hotelAvailabilityDateCommission.deleteMany({
            where: { hotelAvailabilityId: availability.id },
          });

          // 3️⃣ Обновляем основные данные HotelAvailability
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

          // // 4️⃣ Создаём новые записи HotelAvailabilityDateCommission
          if (
            availability.hotelAvailabilityDateCommissions &&
            availability.hotelAvailabilityDateCommissions.length > 0
          ) {
            const dateData = availability.hotelAvailabilityDateCommissions.map(
              (d) => ({
                hotelAvailabilityId: availability.id,
                date: new Date(d.date),
                calendarId: d.calendarId,
                startDate: new Date(),
                endDate: null,
                // 💰 значения комиссий по умолчанию — если в DTO не переданы
                roomFee: commissionDate?.roomFee ?? 0,
                foodFee: commissionDate?.foodFee ?? 0,
                additionalFee: commissionDate?.additionalFee ?? 0,
                serviceFee: commissionDate?.serviceFee ?? 0,
                createdAt: new Date(),
                updatedAt: new Date(),
              }),
            );

            await tx.hotelAvailabilityDateCommission.createMany({
              data: dateData,
              skipDuplicates: true,
            });
          }
        }
      });

      // 5️⃣ После транзакции возвращаем обновлённые данные
      const updated = await this.prisma.hotelAvailability.findMany({
        where: { hotelId },
        include: {
          hotelAvailabilityDateCommissions: true,
        },
        orderBy: { id: 'asc' },
      });

      return updated;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findDetailsByHotelId(hotelId: number): Promise<void> {
    const foods = await this.prisma.hotelFood.findMany({
      where: { hotelId },
    });
  }
}
