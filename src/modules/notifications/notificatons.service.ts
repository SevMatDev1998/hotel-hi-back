import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PartnerCommission } from '@prisma/client';
import { EmailService } from '../email/email.service';

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

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

  async getPartnerCommissions(hotelId: number, partnerId: number) {
    // Get all hotel availabilities
    const availabilities = await this.prisma.hotelAvailability.findMany({
      where: { hotelId },
      include: {
        hotelAvailabilityDateCommissions: true,
      },
    });

    // Get existing partner commissions grouped by availability
    const partnerCommissions = await this.prisma.partnerCommission.findMany({
      where: {
        partnerId,
        hotelAvailability: { hotelId },
      },
      include: {
        hotelAvailabilityDate: true,
      },
    });

    // Filter and map availabilities that have commission records
    return availabilities
      .map((availability) => {
        // Check if partner has saved commissions for this availability
        const partnerDateCommissions = partnerCommissions.filter(
          (pc) => pc.hotelAvailabilityId === availability.id,
        );

        const hasPartnerCommissions = partnerDateCommissions.length > 0;
        const hasHotelCommissions =
          availability.hotelAvailabilityDateCommissions.length > 0;

        // If partner has saved commissions, use them; otherwise use hotel commissions
        const commissionsToShow = hasPartnerCommissions
          ? partnerDateCommissions.map((pc) => ({
              id: pc.hotelAvailabilityDate?.id || pc.id,
              hotelAvailabilityId: availability.id,
              date: pc.hotelAvailabilityDate?.date || new Date(),
              calendarId: pc.hotelAvailabilityDate?.calendarId || '',
              startDate: pc.hotelAvailabilityDate?.startDate,
              endDate: pc.hotelAvailabilityDate?.endDate,
              roomFee: pc.roomFee,
              foodFee: pc.foodFee,
              additionalFee: pc.additionalFee,
              serviceFee: pc.serviceFee,
              createdAt: pc.createdAt,
              updatedAt: pc.updatedAt,
            }))
          : availability.hotelAvailabilityDateCommissions;

        return {
          ...availability,
          hotelAvailabilityDateCommissions: commissionsToShow,
          hasPartnerCommissions,
          hasCommissions: hasPartnerCommissions || hasHotelCommissions,
        };
      })
      .filter((availability) => {
        // Only include availabilities that have at least one commission record (hotel or partner)
        return availability.hasCommissions;
      });
  }

  async savePartnerCommissions(
    partnerId: number,
    availabilityIds: number[],
  ): Promise<PartnerCommission[]> {
    const results: PartnerCommission[] = [];

    for (const availabilityId of availabilityIds) {
      const dateCommissions =
        await this.prisma.hotelAvailabilityDateCommission.findMany({
          where: { hotelAvailabilityId: availabilityId },
        });

      for (const dateCommission of dateCommissions) {
        const existing = await this.prisma.partnerCommission.findFirst({
          where: {
            partnerId,
            hotelAvailabilityDateId: dateCommission.id,
          },
        });

        if (!existing) {
          const created = await this.prisma.partnerCommission.create({
            data: {
              partnerId,
              hotelAvailabilityId: availabilityId,
              hotelAvailabilityDateId: dateCommission.id,
              roomFee: dateCommission.roomFee,
              foodFee: dateCommission.foodFee,
              additionalFee: dateCommission.additionalFee,
              serviceFee: dateCommission.serviceFee,
              isDefault: false,
            },
          });
          results.push(created);
        }
      }
    }

    if (results.length > 0) {
      await this.prisma.partner.update({
        where: { id: partnerId },
        data: { isPartnerCommissionAccept: true },
      });
    }

    return results;
  }

  async sendPartnerNotification(
    hotelId: number,
    partnerId: number,
  ): Promise<{ success: boolean; message: string }> {
    const hotel = await this.prisma.hotel.findUnique({
      where: { id: hotelId },
    });

    if (!hotel) {
      return { success: false, message: 'Hotel not found' };
    }

    const partner = await this.prisma.partner.findUnique({
      where: { id: partnerId },
    });

    if (!partner) {
      return { success: false, message: 'Partner not found' };
    }

    const emailSent = await this.emailService.sendPartnerCommissionNotification(
      partner.email,
      partner.name,
      hotel.name,
      hotelId,
      partnerId,
    );

    if (!emailSent) {
      return { success: false, message: 'Failed to send notification email' };
    }

    return { success: true, message: 'Notification sent successfully' };
  }
}
