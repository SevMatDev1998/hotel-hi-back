import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateHotelAvailabilityDateCommissionsDto } from './dto';

@Injectable()
export class HotelAvailabilityDateCommissionService {
  constructor(private readonly prisma: PrismaService) { }


  async updateByHotelAvailabilityId(
    hotelAvailabilityId: number,
    dto: UpdateHotelAvailabilityDateCommissionsDto,
  ): Promise<{ message: string; updated: number }> {
    // Verify that the hotel availability exists
    const hotelAvailability = await this.prisma.hotelAvailability.findUnique({
      where: { id: hotelAvailabilityId },
    });

    if (!hotelAvailability) {
      throw new NotFoundException(
        `HotelAvailability with id=${hotelAvailabilityId} not found`,
      );
    }

    try {
      // Update all date commissions for this availability with the new fee values
      const result = await this.prisma.hotelAvailabilityDateCommission.updateMany({
        where: { hotelAvailabilityId },
        data: {
          roomFee: dto.roomFee,
          foodFee: dto.foodFee,
          additionalFee: dto.additionalFee,
          serviceFee: dto.serviceFee,
          updatedAt: new Date(),
        },
      });

      return {
        message: 'Date commissions updated successfully',
        updated: result.count,
      };
    } catch (error) {
      console.error('Error updating date commissions:', error);
      throw error;
    }
  }

  /**
   * Delete all date commissions by hotelAvailabilityId
   * @param hotelAvailabilityId - The ID of the hotel availability
   */
  async deleteByHotelAvailabilityId(
    hotelAvailabilityId: number,
  ): Promise<{ message: string; deleted: number }> {
    const result = await this.prisma.hotelAvailabilityDateCommission.deleteMany({
      where: { hotelAvailabilityId },
    });

    return {
      message: 'Date commissions deleted successfully',
      deleted: result.count,
    };
  }
}
