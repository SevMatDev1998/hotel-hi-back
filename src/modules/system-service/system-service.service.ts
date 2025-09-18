import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SystemServiceDto } from './dto/system-service.dto';

@Injectable()
export class SystemServiceService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<SystemServiceDto[]> {
    const systemServices = await this.prisma.systemService.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return systemServices.map((service) => ({
      id: service.id,
      systemServiceGroupId: service.systemServiceGroupId,
      systemServiceTypeId: service.systemServiceTypeId,
      name: service.name,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    }));
  }
}
