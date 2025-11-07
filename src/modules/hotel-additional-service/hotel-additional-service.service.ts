import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHotelAdditionalServiceDto } from './dto';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class HotelAdditionalServiceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateHotelAdditionalServiceDto) {
    return this.prisma.hotelAdditionalService.create({
      data: {
        hotelServiceId: createDto.hotelServiceId,
        hotelAvailabilityId: createDto.hotelAvailabilityId,
        hotelRoomId: createDto.hotelRoomId || null,
        isTimeLimited: createDto.isTimeLimited,
        startTime: createDto.startTime ? new Date(createDto.startTime) : null,
        percentage: createDto.percentage || null,
        price: createDto.price ? new Decimal(createDto.price) : null,
        notConstantValue: createDto.notConstantValue || false,
        serviceName: createDto.serviceName,
      },
    });
  }

  async createWithTransaction(
    tx: Prisma.TransactionClient,
    createDto: CreateHotelAdditionalServiceDto,
  ) {
    return tx.hotelAdditionalService.create({
      data: {
        hotelServiceId: createDto.hotelServiceId,
        hotelAvailabilityId: createDto.hotelAvailabilityId,
        hotelRoomId: createDto.hotelRoomId || null,
        isTimeLimited: createDto.isTimeLimited,
        startTime: createDto.startTime ? new Date(createDto.startTime) : null,
        percentage: createDto.percentage || null,
        price: createDto.price ? new Decimal(createDto.price) : null,
        notConstantValue: createDto.notConstantValue || false,
        serviceName: createDto.serviceName,
      },
    });
  }

  async createMany(
    tx: Prisma.TransactionClient,
    dtos: CreateHotelAdditionalServiceDto[],
  ) {
    return Promise.all(dtos.map((dto) => this.createWithTransaction(tx, dto)));
  }
}
