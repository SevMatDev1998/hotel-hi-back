import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RoomBedTypeDto } from './dto/room-bed-type.dto';

@Injectable()
export class RoomBedTypesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<RoomBedTypeDto[]> {
    return await this.prisma.roomBedType.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
}
