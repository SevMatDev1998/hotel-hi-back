import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SystemServiceDto } from './dto/system-service.dto';

@Injectable()
export class SystemServiceService {
  constructor(private prisma: PrismaService) { }

  async findAll(): Promise<SystemServiceDto[]> {
    const systemServices = await this.prisma.systemService.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return systemServices.map((service) => ({
      id: service.id,
      name: service.name,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
    }));
  }

  async findByTypeId(typeId: number): Promise<SystemServiceDto[]> {
    const systemServices = await this.prisma.systemService.findMany({
      where: {
        systemServiceTypeId: typeId,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return systemServices;
  }

  async findAdditionalService(): Promise<SystemServiceDto[]> {
    const systemServices = await this.prisma.systemService.findMany({
      where: {
        isAdditional: true,
      },
      orderBy: {
        name: 'asc',
      },
    });
    return systemServices;
  }

}
