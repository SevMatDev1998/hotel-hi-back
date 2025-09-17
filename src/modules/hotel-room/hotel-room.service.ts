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

  async create(createHotelRoomDto: CreateHotelRoomDto): Promise<HotelRoom> {
    try {
      // Validate that the hotel exists
      const hotel = await this.prisma.hotel.findUnique({
        where: { id: createHotelRoomDto.hotelId },
      });

      if (!hotel) {
        throw new NotFoundException(
          `Hotel with ID ${createHotelRoomDto.hotelId} not found`,
        );
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
          name: createHotelRoomDto.name,
          hotelId: createHotelRoomDto.hotelId,
          roomClassId: createHotelRoomDto.roomClassId,
          roomViewId: createHotelRoomDto.roomViewId,
          numbers: createHotelRoomDto.numbers,
          area: createHotelRoomDto.area,
          mainGuestQuantity: createHotelRoomDto.mainGuestQuantity,
          additionalGuestQuantity: createHotelRoomDto.additionalGuestQuantity,
          status: createHotelRoomDto.status,
          roomNumberQuantity: createHotelRoomDto.roomNumberQuantity,
          completeness: createHotelRoomDto.completeness,
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
}
