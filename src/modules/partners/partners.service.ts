import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { PartnerStatus } from '@prisma/client';

@Injectable()
export class PartnersService {
  constructor(private prisma: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto) {
    return this.prisma.partner.create({
      data: {
        ...createPartnerDto,
        countryId: parseInt(createPartnerDto.countryId),
        status: PartnerStatus.Pending,
      },
    });
  }

  async findAll() {
    return this.prisma.partner.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        country: true,
      },
    });
  }
}
