import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CuisineDto } from './dto/cuisine.dto';

@Injectable()
export class CuisinesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<CuisineDto[]> {
    const cuisines = await this.prisma.cuisine.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return cuisines.map((cuisine) => ({
      id: cuisine.id,
      name: cuisine.name,
      createdAt: cuisine.createdAt,
      updatedAt: cuisine.updatedAt,
    }));
  }
}
