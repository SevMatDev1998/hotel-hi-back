import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SystemServiceTypeDto } from './dto/system-service-type.dto';

@Injectable()
export class SystemServiceTypeService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<SystemServiceTypeDto[]> {
    const systemServiceTypes = await this.prisma.systemServiceType.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return systemServiceTypes.map((serviceType) => ({
      id: serviceType.id,
      name: serviceType.name,
      createdAt: serviceType.createdAt,
      updatedAt: serviceType.updatedAt,
    }));
  }
}
