import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PartnersService } from '../partners/partners.service';
import { CreatePartnerDto } from '../partners/dto/create-partner.dto';
import { UpdatePartnerDto } from '../partners/dto/update-partner.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class HotelPartnerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly partnersService: PartnersService,
    private readonly emailService: EmailService,
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
    // Check if partner with this TIN already exists
    let partner = await this.findByTinNumber(createPartnerDto.tin);
    // If partner doesn't exist, create a new one
    if (!partner) {
      partner = await this.partnersService.create(createPartnerDto);
    }

    // Check if this hotel-partner relationship already exists
    const existingRelation = await this.prisma.hotelPartner.findUnique({
      where: {
        hotelId_partnerId: {
          hotelId,
          partnerId: partner.id,
        },
      },
      include: {
        partner: true,
        hotel: true,
      },
    });

    // If relationship already exists, return it
    if (existingRelation) {
      return existingRelation;
    }

    const hotelPartner = await this.prisma.hotelPartner.create({
      data: {
        hotelId,
        partnerId: partner.id,
      },
      include: {
        partner: true,
        hotel: true,
      },
    });

    // Send partnership invitation email (non-blocking)
    this.emailService
      .sendPartnershipInvitation(
        partner.email,
        partner.name,
        hotelPartner.hotel.name,
        partner.id,
      )
      .catch((error) => {
        console.error('Failed to send partnership invitation email:', error);
      });

    return hotelPartner;
  }

  async findByPartnerId(partnerId: number) {
    const partner = await this.prisma.partner.findFirst({
      where: {
        id: partnerId,
      },
    });
    return partner;
  }

  async findByTinNumber(tinNumber: string) {
    const partner = await this.prisma.partner.findFirst({
      where: {
        tin: tinNumber,
      },
    });
    return partner;
  }

  async update(partnerId: number, updatePartnerDto: UpdatePartnerDto) {
    const partner = await this.prisma.partner.update({
      where: {
        id: partnerId,
      },
      data: updatePartnerDto,
    });
    return partner;
  }
}
