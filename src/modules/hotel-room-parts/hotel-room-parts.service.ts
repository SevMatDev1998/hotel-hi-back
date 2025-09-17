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
    createHotelRoomPartsDto: CreateHotelRoomPartsDto,
  ): Promise<HotelRoomPart[]> {
    try {
      // Validate that the hotel room exists
      const hotelRoom = await this.prisma.hotelRoom.findUnique({
        where: { id: createHotelRoomPartsDto.hotelRoomId },
      });

      if (!hotelRoom) {
        throw new NotFoundException(
          `Hotel room with ID ${createHotelRoomPartsDto.hotelRoomId} not found`,
        );
      }

      // Validate that all room parts exist
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

      // Delete existing room parts for this hotel room
      await this.prisma.hotelRoomPart.deleteMany({
        where: { hotelRoomId: createHotelRoomPartsDto.hotelRoomId },
      });

      // Create individual records for each room part based on quantity
      const roomPartsToCreate: Array<{
        hotelRoomId: number;
        roomPartId: number;
      }> = [];

      createHotelRoomPartsDto.roomParts.forEach((roomPartItem) => {
        for (let i = 0; i < roomPartItem.quantity; i++) {
          roomPartsToCreate.push({
            hotelRoomId: createHotelRoomPartsDto.hotelRoomId,
            roomPartId: roomPartItem.roomPartId,
          });
        }
      });

      // Bulk create all room parts
      await this.prisma.hotelRoomPart.createMany({
        data: roomPartsToCreate,
      });

      // Return the created room parts with relations
      const result = await this.prisma.hotelRoomPart.findMany({
        where: { hotelRoomId: createHotelRoomPartsDto.hotelRoomId },
        include: {
          roomPart: true,
          hotelRoom: {
            include: {
              hotel: true,
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
      throw new BadRequestException('Failed to create hotel room parts');
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
          hotelRoom: {
            include: {
              hotel: true,
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
