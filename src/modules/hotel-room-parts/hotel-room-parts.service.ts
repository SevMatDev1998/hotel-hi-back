import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHotelRoomPartsDto } from './dto';
import { HotelRoomPart } from '@prisma/client';

@Injectable()
export class HotelRoomPartsService {
  constructor(private readonly prisma: PrismaService) { }

  // async createRoomParts(
  //   hotelRoomId: number,
  //   createHotelRoomPartsDto: CreateHotelRoomPartsDto,
  // ): Promise<HotelRoomPart[]> {
  //   try {
  //     // Validate that the hotel room exists
  //     const hotelRoom = await this.prisma.hotelRoom.findUnique({
  //       where: { id: hotelRoomId },
  //     });

  //     if (!hotelRoom) {
  //       throw new NotFoundException(
  //         `Hotel room with ID ${hotelRoomId} not found`,
  //       );
  //     }

  //     // Validate that all room parts exist
  //     const roomPartIds = createHotelRoomPartsDto.roomParts.map(
  //       (rp) => rp.roomPartId,
  //     );
  //     const existingRoomParts = await this.prisma.roomPart.findMany({
  //       where: { id: { in: roomPartIds } },
  //     });

  //     if (existingRoomParts.length !== roomPartIds.length) {
  //       const foundIds = existingRoomParts.map((rp) => rp.id);
  //       const missingIds = roomPartIds.filter((id) => !foundIds.includes(id));
  //       throw new NotFoundException(
  //         `Room part(s) with ID(s) ${missingIds.join(', ')} not found`,
  //       );
  //     }

  //     // Delete existing room parts for this hotel room
  //     await this.prisma.hotelRoomPart.deleteMany({
  //       where: { hotelRoomId: hotelRoomId },
  //     });

  //     // Create individual records for each room part based on quantity
  //     const roomPartsToCreate: Array<{
  //       hotelRoomId: number;
  //       roomPartId: number;
  //     }> = [];

  //     createHotelRoomPartsDto.roomParts.forEach((roomPartItem) => {
  //       for (let i = 0; i < roomPartItem.quantity; i++) {
  //         roomPartsToCreate.push({
  //           hotelRoomId: hotelRoomId,
  //           roomPartId: roomPartItem.roomPartId,
  //         });
  //       }
  //     });

  //     // Bulk create all room parts
  //     await this.prisma.hotelRoomPart.createMany({
  //       data: roomPartsToCreate,
  //     });

  //     // Return the created room parts with relations
  //     const result = await this.prisma.hotelRoomPart.findMany({
  //       where: { hotelRoomId: hotelRoomId },
  //       include: {
  //         roomPart: true,
  //         hotelRoom: {
  //           include: {
  //             hotel: true,
  //           },
  //         },
  //       },
  //     });

  //     return result;
  //   } catch (error) {
  //     console.log('Error in createRoomParts:', error);
  //     if (
  //       error instanceof NotFoundException ||
  //       error instanceof BadRequestException
  //     ) {
  //       throw error;
  //     }
  //     throw new BadRequestException('Failed to create hotel room parts');
  //   }
  // }
  async createRoomParts(
    hotelRoomId: number,
    createHotelRoomPartsDto: CreateHotelRoomPartsDto,
  ): Promise<HotelRoomPart[]> {
    try {
      // Проверяем, что номер существует
      const hotelRoom = await this.prisma.hotelRoom.findUnique({
        where: { id: hotelRoomId },
      });

      if (!hotelRoom) {
        throw new NotFoundException(`Hotel room with ID ${hotelRoomId} not found`);
      }

      // Проверяем, что все указанные части существуют
      const roomPartIds = createHotelRoomPartsDto.roomParts.map((rp) => rp.roomPartId);
      const existingRoomParts = await this.prisma.roomPart.findMany({
        where: { id: { in: roomPartIds } },
      });

      if (existingRoomParts.length !== roomPartIds.length) {
        const foundIds = existingRoomParts.map((rp) => rp.id);
        const missingIds = roomPartIds.filter((id) => !foundIds.includes(id));
        throw new NotFoundException(
          `Room part(s) with ID(s) ${missingIds.join(', ')} not found`,
        );
      }

      // Находим уже существующие записи для данного hotelRoomId
      const existingHotelRoomParts = await this.prisma.hotelRoomPart.findMany({
        where: { hotelRoomId },
      });

      const partsToAdd: { hotelRoomId: number; roomPartId: number }[] = [];

      // Для каждой части из DTO проверяем, сколько уже существует
      for (const roomPartItem of createHotelRoomPartsDto.roomParts) {
        const existingCount = existingHotelRoomParts.filter(
          (p) => p.roomPartId === roomPartItem.roomPartId,
        ).length;

        const neededCount = roomPartItem.quantity;

        // Если не хватает — добавляем недостающие
        if (neededCount > existingCount) {
          const toCreate = neededCount - existingCount;
          for (let i = 0; i < toCreate; i++) {
            partsToAdd.push({
              hotelRoomId,
              roomPartId: roomPartItem.roomPartId,
            });
          }
        }

        // Если их больше, чем нужно — можно удалить лишние (опционально)
        // Если нужно только добавлять, этот блок можно убрать
        // if (existingCount > neededCount) {
        //   const toDelete = existingCount - neededCount;
        //   const toRemove = existingHotelRoomParts
        //     .filter((p) => p.roomPartId === roomPartItem.roomPartId)
        //     .slice(0, toDelete);
        //   await this.prisma.hotelRoomPart.deleteMany({
        //     where: { id: { in: toRemove.map((r) => r.id) } },
        //   });
        // }
      }

      if (partsToAdd.length > 0) {
        await this.prisma.hotelRoomPart.createMany({
          data: partsToAdd,
        });
      }

      // Возвращаем обновлённые данные
      const result = await this.prisma.hotelRoomPart.findMany({
        where: { hotelRoomId },
        include: {
          roomPart: true,
          hotelRoom: { include: { hotel: true } },
        },
      });

      return result;
    } catch (error) {
      console.log('Error in createRoomParts:', error);
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to create or update hotel room parts');
    }
  }

  async getRoomPartsByHotelRoom(hotelRoomId: number): Promise<HotelRoomPart[]> {
    try {
      console.log('hotelRoomId', hotelRoomId);
      const hotelRoom = await this.prisma.hotelRoom.findUnique({
        where: { id: hotelRoomId },
      });

      if (!hotelRoom) {
        throw new NotFoundException(
          `Hotel room with ID ${hotelRoomId} not found`,
        );
      }

      return await this.prisma.hotelRoomPart.findMany({
        where: { hotelRoomId },
        include: {
          roomPart: true,
          hotelRoomPartBeds: true,
        },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to retrieve hotel room parts');
    }
  }

  async deleteRoomPart(id: number): Promise<void> {
    try {
      const hotelRoomPart = await this.prisma.hotelRoomPart.findUnique({
        where: { id },
      });

      if (!hotelRoomPart) {
        throw new NotFoundException(`Hotel room part with ID ${id} not found`);
      }

      await this.prisma.hotelRoomPart.delete({
        where: { id },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Failed to delete hotel room part');
    }
  }
}
