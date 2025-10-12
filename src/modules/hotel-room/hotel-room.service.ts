import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHotelRoomDto } from './dto';
import { HotelRoom } from '@prisma/client';

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
          roomNumberQuantity: 0,
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

  async getHotelRoomsByHotelId(hotelId: number): Promise<HotelRoom[]> {
    const hotelRooms = await this.prisma.hotelRoom.findMany({
      where: {
        hotelId: hotelId,
      },
      include: { roomView: true, roomClass: true },
        orderBy: {
        name: 'asc',
      },
    });

    return hotelRooms;
  }
}
