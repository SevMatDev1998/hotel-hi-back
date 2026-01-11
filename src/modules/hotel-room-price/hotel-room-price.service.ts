import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHotelRoomPriceDto } from './dto';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class HotelRoomPriceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createHotelRoomPriceDto: CreateHotelRoomPriceDto) {
    return this.prisma.hotelRoomPrice.create({
      data: {
        hotelRoomId: createHotelRoomPriceDto.hotelRoomId,
        hotelAvailabilityId: createHotelRoomPriceDto.hotelAvailabilityId,
        guestCount: createHotelRoomPriceDto.guestCount,
        price: new Decimal(createHotelRoomPriceDto.price),
        dateFrom: new Date(),
        dateTo: new Date(),
      },
    });
  }

  async createWithTransaction(
    tx: Prisma.TransactionClient,
    createHotelRoomPriceDto: CreateHotelRoomPriceDto,
  ) {
    return tx.hotelRoomPrice.create({
      data: {
        hotelRoomId: createHotelRoomPriceDto.hotelRoomId,
        hotelAvailabilityId: createHotelRoomPriceDto.hotelAvailabilityId,
        guestCount: createHotelRoomPriceDto.guestCount,
        price: new Decimal(createHotelRoomPriceDto.price),
        dateFrom: new Date(),
        dateTo: new Date(),
      },
    });
  }

  async createOrUpdate(
    tx: Prisma.TransactionClient,
    createHotelRoomPriceDto: CreateHotelRoomPriceDto,
  ) {
    // Сначала удаляем существующую запись для этого guestCount
    await tx.hotelRoomPrice.deleteMany({
      where: {
        hotelRoomId: createHotelRoomPriceDto.hotelRoomId,
        hotelAvailabilityId: createHotelRoomPriceDto.hotelAvailabilityId,
        guestCount: createHotelRoomPriceDto.guestCount,
      },
    });

    // Создаем новую запись
    return tx.hotelRoomPrice.create({
      data: {
        hotelRoomId: createHotelRoomPriceDto.hotelRoomId,
        hotelAvailabilityId: createHotelRoomPriceDto.hotelAvailabilityId,
        guestCount: createHotelRoomPriceDto.guestCount,
        price: new Decimal(createHotelRoomPriceDto.price),
        dateFrom: new Date(),
        dateTo: new Date(),
      },
    });
  }
}
