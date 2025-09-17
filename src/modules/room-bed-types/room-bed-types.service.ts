import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RoomBedTypeDto } from './dto/room-bed-type.dto';

@Injectable()
export class RoomBedTypesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<RoomBedTypeDto[]> {
    const roomBedTypes = await this.prisma.roomBedType.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return roomBedTypes.map((roomBedType) => ({
      id: roomBedType.id,
      name: roomBedType.name,
      createdAt: roomBedType.createdAt,
      updatedAt: roomBedType.updatedAt,
    }));
  }
}
