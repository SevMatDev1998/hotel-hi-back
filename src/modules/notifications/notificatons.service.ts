import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PartnerCommission } from '@prisma/client';
import { EmailService } from '../email/email.service';

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) { }

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
    await this.prisma.partner.update({
      where: { id: partnerId },
      data: { isPartnerCommissionAccept: true },
    });

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

    // Get commission data for the email
    const commissionData = await this.getPartnerCommissions(hotelId, partnerId);

    // Format commission data for email
    const formattedCommissions = commissionData.flatMap((availability) => {
      if (!availability.hotelAvailabilityDateCommissions.length) return [];

      // Group by same commission values
      const commissionGroups = new Map<string, Array<any>>();

      availability.hotelAvailabilityDateCommissions.forEach(
        (dateCommission) => {
          const key = `${Number(dateCommission.roomFee)}-${Number(dateCommission.foodFee)}-${Number(dateCommission.additionalFee)}-${Number(dateCommission.serviceFee)}`;

          if (!commissionGroups.has(key)) {
            commissionGroups.set(key, []);
          }
          commissionGroups.get(key)!.push(dateCommission);
        },
      );

      // Create formatted entries
      return Array.from(commissionGroups.entries()).map(
        ([, dateCommissions]) => {
          const firstCommission = dateCommissions[0];

          // Format date range
          let dateRange = 'Multiple dates';
          if (dateCommissions.length === 1) {
            const comm = dateCommissions[0];
            if (comm.startDate && comm.endDate) {
              dateRange = `${new Date(comm.startDate).toLocaleDateString()} - ${new Date(comm.endDate).toLocaleDateString()}`;
            } else if (comm.date) {
              dateRange = new Date(comm.date).toLocaleDateString();
            }
          } else {
            // Multiple dates with same commission
            dateRange = `${dateCommissions.length} periods`;
          }

          return {
            availabilityTitle: availability.title,
            availabilityColor: availability.color,
            dateRange,
            roomFee: Number(firstCommission.roomFee),
            foodFee: Number(firstCommission.foodFee),
            additionalFee: Number(firstCommission.additionalFee),
            serviceFee: Number(firstCommission.serviceFee),
          };
        },
      );
    });

    const emailSent = await this.emailService.sendPartnerCommissionNotification(
      partner.email,
      partner.name,
      hotel.name,
      hotelId,
      partnerId,
      formattedCommissions,
    );

    if (!emailSent) {
      return { success: false, message: 'Failed to send notification email' };
    }

    return { success: true, message: 'Notification sent successfully' };
  }

  async updatePartnerCommission(
    partnerId: number,
    hotelAvailabilityId: number,
    commissionData: {
      roomFee: number;
      foodFee: number;
      additionalFee: number;
      serviceFee: number;
    },
  ): Promise<PartnerCommission[]> {
    // Check if partner commissions exist for this availability
    const existingPartnerCommissions =
      await this.prisma.partnerCommission.findMany({
        where: {
          partnerId,
          hotelAvailabilityId,
        },
      });

    // If no partner commissions exist, create them from hotel commissions
    if (existingPartnerCommissions.length === 0) {
      const hotelDateCommissions =
        await this.prisma.hotelAvailabilityDateCommission.findMany({
          where: { hotelAvailabilityId },
        });

      // Create partner commissions for all hotel date commissions
      const createPromises = hotelDateCommissions.map((dateCommission) =>
        this.prisma.partnerCommission.create({
          data: {
            partnerId,
            hotelAvailabilityId,
            hotelAvailabilityDateId: dateCommission.id,
            roomFee: commissionData.roomFee,
            foodFee: commissionData.foodFee,
            additionalFee: commissionData.additionalFee,
            serviceFee: commissionData.serviceFee,
            isDefault: false,
          },
        }),
      );

      return Promise.all(createPromises);
    }

    // If partner commissions exist, update them with new values
    const updatePromises = existingPartnerCommissions.map((commission) =>
      this.prisma.partnerCommission.update({
        where: { id: commission.id },
        data: {
          roomFee: commissionData.roomFee,
          foodFee: commissionData.foodFee,
          additionalFee: commissionData.additionalFee,
          serviceFee: commissionData.serviceFee,
        },
      }),
    );

    return Promise.all(updatePromises);
  }
}
