import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RoomViewDto } from './dto/room-view.dto';

@Injectable()
export class RoomViewsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<RoomViewDto[]> {
    const roomViews = await this.prisma.roomView.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return roomViews.map((roomView) => ({
      id: roomView.id,
      name: roomView.name,
      createdAt: roomView.createdAt,
      updatedAt: roomView.updatedAt,
    }));
  }
}
