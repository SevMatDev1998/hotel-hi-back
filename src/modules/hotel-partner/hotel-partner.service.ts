import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PartnersService } from '../partners/partners.service';
import { CreatePartnerDto } from '../partners/dto/create-partner.dto';

@Injectable()
export class HotelPartnerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly partnersService: PartnersService,
  ) {}

  async findAllByHotelId(
    hotelId: number,
    options?: { page?: number; search?: string },
  ) {
    const { page = 1, search = '' } = options || {};

    const limit = 10;
    const skip = (page - 1) * limit;

    const partners = await this.prisma.hotelPartner.findMany({
      where: {
        hotelId,
        partner: search
          ? {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            }
          : undefined,
      },
      include: {
        partner: true,
      },
      skip,
      take: limit,
      orderBy: {
        id: 'asc', // optional: define sorting
      },
    });

    // Optional: if you want to return pagination metadata
    const totalCount = await this.prisma.hotelPartner.count({
      where: {
        hotelId,
        partner: search
          ? {
              name: {
                contains: search,
                mode: 'insensitive',
              },
            }
          : undefined,
      },
    });

    return {
      data: partners.map((p) => p.partner),
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

  async create(hotelId: number, createPartnerDto: CreatePartnerDto) {
    const partner = await this.partnersService.create(createPartnerDto);

    return this.prisma.hotelPartner.create({
      data: {
        hotelId,
        partnerId: partner.id,
      },
      include: {
        partner: true,
      },
    });
  }
}
