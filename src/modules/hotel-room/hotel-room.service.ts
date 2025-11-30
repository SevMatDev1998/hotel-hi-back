import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHotelRoomDto } from './dto';
import { HotelRoom } from '@prisma/client';
import { EditHotelRoomDto } from './dto/edit-hotel-room.dto';

@Injectable()
export class HotelRoomService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    hotelId: number,
    createHotelRoomDto: CreateHotelRoomDto,
  ): Promise<HotelRoom> {
    try {
      // Validate that the hotel exists
      const hotel = await this.prisma.hotel.findUnique({
        where: { id: hotelId },
      });
      if (!hotel) {
        throw new NotFoundException(`Hotel with ID ${hotelId} not found`);
      }

      // Validate that the room class exists
      const roomClass = await this.prisma.roomClass.findUnique({
        where: { id: createHotelRoomDto.roomClassId },
      });

      if (!roomClass) {
        throw new NotFoundException(
          `Room class with ID ${createHotelRoomDto.roomClassId} not found`,
        );
      }

      // Validate room view if provided
      if (createHotelRoomDto.roomViewId) {
        const roomView = await this.prisma.roomView.findUnique({
          where: { id: createHotelRoomDto.roomViewId },
        });

        if (!roomView) {
          throw new NotFoundException(
            `Room view with ID ${createHotelRoomDto.roomViewId} not found`,
          );
        }
      }

      // Create the hotel room
      const hotelRoom = await this.prisma.hotelRoom.create({
        data: {
          name: 'createHotelRoomDto.name',
          hotelId: hotelId,
          roomClassId: createHotelRoomDto.roomClassId,
          roomViewId: createHotelRoomDto.roomViewId,
          numbers: '',
          area: createHotelRoomDto.area,
          mainGuestQuantity: 0,
          additionalGuestQuantity: 0,
          status: 'Incomplete',
          roomNumberQuantity: createHotelRoomDto.roomNumberQuantity,
          completeness: 'Draft',
        },
        include: {
          hotel: true,
          roomClass: true,
          roomView: true,
        },
      });

      return hotelRoom;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to create hotel room');
    }
  }

  async edit(
    roomId: number,
    editHotelRoomDto: EditHotelRoomDto,
  ): Promise<HotelRoom> {
    try {
      // Validate that the hotel room exists
      const hotelRoom = await this.prisma.hotelRoom.findUnique({
        where: { id: roomId },
      });
      if (!hotelRoom) {
        throw new NotFoundException(`Hotel room with ID ${roomId} not found`);
      }
      // Update the hotel room
      const updatedHotelRoom = await this.prisma.hotelRoom.update({
        where: { id: roomId },
        data: {
          roomClassId: editHotelRoomDto.roomClassId,
          roomViewId: editHotelRoomDto.roomViewId,
          area: editHotelRoomDto.area,
          roomNumberQuantity: editHotelRoomDto.roomNumberQuantity,
        },
        include: {
          hotel: true,
          roomClass: true,
          roomView: true,
        },
      });

      return updatedHotelRoom;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to edit hotel room');
    }
  }

  async getHotelRoomsByHotelId(hotelId: number): Promise<HotelRoom[]> {
    const hotelRooms = await this.prisma.hotelRoom.findMany({
      where: {
        hotelId: hotelId,
      },
      include: { roomView: true, roomClass: true, hotelRoomParts: true },
      orderBy: {
        name: 'asc',
      },
    });

    return hotelRooms;
  }

  async getHotelRoomById(roomId: number): Promise<HotelRoom> {
    const hotelRoom = await this.prisma.hotelRoom.findUnique({
      where: { id: roomId },
      include: { roomView: true, roomClass: true },
    });

    if (!hotelRoom) {
      throw new NotFoundException(`Hotel room with ID ${roomId} not found`);
    }
    return hotelRoom;
  }

}
