import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RoomBedSizeDto } from './dto/room-bed-size.dto';

@Injectable()
export class RoomBedSizesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<RoomBedSizeDto[]> {
    const roomBedSizes = await this.prisma.roomBedSize.findMany({
      orderBy: {
        size: 'asc',
      },
    });

    return roomBedSizes.map((roomBedSize) => ({
      id: roomBedSize.id,
      size: roomBedSize.size,
      createdAt: roomBedSize.createdAt,
      updatedAt: roomBedSize.updatedAt,
    }));
  }
}
