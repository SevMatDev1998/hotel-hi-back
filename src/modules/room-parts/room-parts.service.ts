import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RoomPartDto } from './dto/room-part.dto';

@Injectable()
export class RoomPartsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<RoomPartDto[]> {
    const roomParts = await this.prisma.roomPart.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return roomParts.map((roomPart) => ({
      id: roomPart.id,
      name: roomPart.name,
      createdAt: roomPart.createdAt,
      updatedAt: roomPart.updatedAt,
    }));
  }
}
