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
  constructor(private readonly prisma: PrismaService) {}

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
        throw new NotFoundException(
          `Hotel room with ID ${hotelRoomId} not found`,
        );
      }

      // Проверяем, что все указанные части существуют
      const roomPartIds = createHotelRoomPartsDto.roomParts.map(
        (rp) => rp.roomPartId,
      );

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

      // Получаем существующие части для данного номера
      const existingHotelRoomParts = await this.prisma.hotelRoomPart.findMany({
        where: { hotelRoomId },
        include: {
          hotelRoomPartBeds: true,
        },
      });

      // Создаём карту: roomPartId -> количество нужных частей
      const desiredPartsMap = new Map<number, number>();
      for (const rp of createHotelRoomPartsDto.roomParts) {
        desiredPartsMap.set(rp.roomPartId, rp.quantity);
      }

      // Создаём карту существующих: roomPartId -> массив HotelRoomPart
      const existingPartsMap = new Map<number, typeof existingHotelRoomParts>();
      for (const part of existingHotelRoomParts) {
        const existing = existingPartsMap.get(part.roomPartId) || [];
        existing.push(part);
        existingPartsMap.set(part.roomPartId, existing);
      }

      // Определяем что удалить, что оставить, что добавить
      const partsToDelete: number[] = [];
      const partsToCreate: { hotelRoomId: number; roomPartId: number }[] = [];

      // Проверяем каждый тип части
      for (const [roomPartId, existingParts] of existingPartsMap) {
        const desiredCount = desiredPartsMap.get(roomPartId) || 0;
        const currentCount = existingParts.length;

        if (desiredCount < currentCount) {
          // Нужно удалить лишние (удаляем те, у которых НЕТ кроватей)
          const sortedParts = [...existingParts].sort((a, b) => {
            const aHasBeds = a.hotelRoomPartBeds && a.hotelRoomPartBeds.length > 0;
            const bHasBeds = b.hotelRoomPartBeds && b.hotelRoomPartBeds.length > 0;
            if (aHasBeds && !bHasBeds) return -1;
            if (!aHasBeds && bHasBeds) return 1;
            return 0;
          });
          
          const toDeleteCount = currentCount - desiredCount;
          for (let i = 0; i < toDeleteCount; i++) {
            partsToDelete.push(sortedParts[sortedParts.length - 1 - i].id);
          }
        } else if (desiredCount > currentCount) {
          // Нужно добавить новые
          const toAddCount = desiredCount - currentCount;
          for (let i = 0; i < toAddCount; i++) {
            partsToCreate.push({ hotelRoomId, roomPartId });
          }
        }
      }

      // Добавляем новые типы частей, которых еще нет
      for (const [roomPartId, quantity] of desiredPartsMap) {
        if (!existingPartsMap.has(roomPartId)) {
          for (let i = 0; i < quantity; i++) {
            partsToCreate.push({ hotelRoomId, roomPartId });
          }
        }
      }

      // Удаляем части, которые больше не нужны (вместе с кроватями)
      if (partsToDelete.length > 0) {
        await this.prisma.hotelRoomPartBed.deleteMany({
          where: { hotelRoomPartId: { in: partsToDelete } },
        });

        await this.prisma.hotelRoomPart.deleteMany({
          where: { id: { in: partsToDelete } },
        });
      }

      // Создаём новые части
      if (partsToCreate.length > 0) {
        await this.prisma.hotelRoomPart.createMany({
          data: partsToCreate,
        });
      }

      // Возвращаем обновлённые данные
      const result = await this.prisma.hotelRoomPart.findMany({
        where: { hotelRoomId },
        include: {
          roomPart: true,
          hotelRoom: { include: { hotel: true } },
          hotelRoomPartBeds: {
            include: {
              roomBedSize: true,
              roomBedType: true,
            },
          },
        },
      });

      return result;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException(
        'Failed to create or update hotel room parts',
      );
    }
  }

  async getRoomPartsByHotelRoom(hotelRoomId: number): Promise<HotelRoomPart[]> {
    try {
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
          hotelRoomPartBeds: {
            include: {
              roomBedSize: true,
              roomBedType: true,
            },
          },
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
