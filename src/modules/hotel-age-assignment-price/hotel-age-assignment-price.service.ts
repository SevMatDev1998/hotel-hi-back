import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

interface CreateHotelAgeAssignmentPriceDto {
  hotelRoomId: number;
  hotelAgeAssignmentId: number;
  price: number;
}

@Injectable()
export class HotelAgeAssignmentPriceService {
  async createMany(
    tx: Prisma.TransactionClient,
    dtos: CreateHotelAgeAssignmentPriceDto[],
  ) {
    if (dtos.length === 0) {
      return [];
    }

    const hotelRoomId = dtos[0].hotelRoomId;

    await tx.hotelAgeAssignmentPrice.deleteMany({
      where: {
        hotelRoomId: hotelRoomId,
      },
    });

    await tx.hotelAgeAssignmentPrice.createMany({
      data: dtos.map((dto) => ({
        hotelRoomId: dto.hotelRoomId,
        hotelAgeAssignmentId: dto.hotelAgeAssignmentId,
        price: dto.price,
      })),
    });

    return tx.hotelAgeAssignmentPrice.findMany({
      where: {
        hotelRoomId: hotelRoomId,
      },
    });
  }
}
