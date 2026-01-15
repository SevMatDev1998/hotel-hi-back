import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  Prisma,
  Partner,
  PartnerStatus,
  HotelAvailability,
} from '@prisma/client';
import { PartnerDto } from './dto/partner.dto';

@Injectable()
export class GuestsService {
  constructor(private prisma: PrismaService) {}

  async getPartnerById(id: number): Promise<Partner | null> {
    return this.prisma.partner.findUnique({
      where: { id },
    });
  }

  async acceptPartnerShip(
    id: number,
    partnerDto: PartnerDto,
  ): Promise<Partner> {
    const updateData = partnerDto as Prisma.PartnerUpdateInput;

    return this.prisma.partner.update({
      where: { id },
      data: {
        ...updateData,
        status: PartnerStatus.Approved,
      },
    });
  }

  async getHotelAvailabilityWithDatesByPartnerid(
    hotelId: number,
  ): Promise<HotelAvailability[]> {
    return this.prisma.hotelAvailability.findMany({
      where: { hotelId },
      include: {
        hotelAvailabilityDateCommissions: true,
      },
    });
  }

  async getHotelInfoByAvailabilityId(availabilityId: number) {
    const availability = await this.prisma.hotelAvailability.findUnique({
      where: { id: availabilityId },
      select: {
        hotel: {
          select: {
            name: true,
            city: true,
            state: true,
            userHotels: {
              take: 1,
              select: {
                user: {
                  select: {
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!availability) {
      throw new Error(`Availability with ID ${availabilityId} not found`);
    }

    const userEmail = availability.hotel?.userHotels?.[0]?.user?.email;

    return {
      hotelName: availability.hotel?.name || '',
      city: availability.hotel?.city || '',
      state: availability.hotel?.state || '',
      userEmail: userEmail || '',
    };
  }
}
