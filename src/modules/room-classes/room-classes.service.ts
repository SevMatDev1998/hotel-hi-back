import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RoomClassDto } from './dto/room-class.dto';

@Injectable()
export class RoomClassesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<RoomClassDto[]> {
    const roomClasses = await this.prisma.roomClass.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return roomClasses.map((roomClass) => ({
      id: roomClass.id,
      name: roomClass.name,
      createdAt: roomClass.createdAt,
      updatedAt: roomClass.updatedAt,
    }));
  }
}
