import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) { }

  async findAll(hotelId: number) {
    return this.prisma.partner.findMany({
      where: {
        hotelPartners: {
          some: {
            hotelId,
          },
        },
      },
    });
  }
}
