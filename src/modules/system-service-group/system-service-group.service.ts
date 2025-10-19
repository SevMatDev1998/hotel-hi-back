import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  SystemServiceGroupDto,
  // SystemServiceGroupHierarchyDto,
} from './dto/system-service-group.dto';

@Injectable()
export class SystemServiceGroupService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<SystemServiceGroupDto[]> {
    const systemServiceGroups = await this.prisma.systemServiceGroup.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return systemServiceGroups.map((group) => ({
      id: group.id,
      name: group.name,
      createdAt: group.createdAt,
      updatedAt: group.updatedAt,
    }));
  }

  // async findAllWithHierarchy(): Promise<SystemServiceGroupHierarchyDto[]> {
  //   const systemServiceGroups = await this.prisma.systemServiceGroup.findMany({
  //     include: {
  //       systemServices: {
  //         include: {
  //           systemServiceType: true,
  //         },
  //         orderBy: {
  //           name: 'asc',
  //         },
  //       },
  //     },
  //     orderBy: {
  //       name: 'asc',
  //     },
  //   });

  //   return systemServiceGroups.map((group) => ({
  //     id: group.id,
  //     name: group.name,
  //     createdAt: group.createdAt,
  //     updatedAt: group.updatedAt,
  //     services: group.systemServices.map((service) => ({
  //       id: service.id,
  //       name: service.name,
  //       systemServiceType: {
  //         id: service.systemServiceType.id,
  //         name: service.systemServiceType.name,
  //       },
  //     })),
  //   }));
  // }
}
