import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateHotelRoomPartBedsDto } from './dto';
import { HotelRoomPartBed } from '@prisma/client';

@Injectable()
export class HotelRoomPartBedsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createHotelRoomPartBedsDto: CreateHotelRoomPartBedsDto,
  ): Promise<HotelRoomPartBed[]> {
    try {
      // Validate that the hotel room part exists
      const hotelRoomPart = await this.prisma.hotelRoomPart.findUnique({
        where: { id: createHotelRoomPartBedsDto.hotelRoomPartId },
        include: {
          hotelRoom: true,
          roomPart: true,
        },
      });

      if (!hotelRoomPart) {
        throw new NotFoundException(
          `Hotel room part with ID ${createHotelRoomPartBedsDto.hotelRoomPartId} not found`,
        );
      }

      // Validate bed sizes and types
      const bedSizeIds = createHotelRoomPartBedsDto.bedConfigurations.map(
        (config) => config.roomBedSizeId,
      );
      const bedTypeIds = createHotelRoomPartBedsDto.bedConfigurations.map(
        (config) => config.roomBedTypeId,
      );

      // Check if all bed sizes exist
      const existingBedSizes = await this.prisma.roomBedSize.findMany({
        where: { id: { in: bedSizeIds } },
      });

      if (existingBedSizes.length !== new Set(bedSizeIds).size) {
        const foundIds = existingBedSizes.map((size) => size.id);
        const missingIds = bedSizeIds.filter((id) => !foundIds.includes(id));
        throw new NotFoundException(
          `Room bed sizes with IDs ${missingIds.join(', ')} not found`,
        );
      }

      // Check if all bed types exist
      const existingBedTypes = await this.prisma.roomBedType.findMany({
        where: { id: { in: bedTypeIds } },
      });

      if (existingBedTypes.length !== new Set(bedTypeIds).size) {
        const foundIds = existingBedTypes.map((type) => type.id);
        const missingIds = bedTypeIds.filter((id) => !foundIds.includes(id));
        throw new NotFoundException(
          `Room bed types with IDs ${missingIds.join(', ')} not found`,
        );
      }

      // Remove existing beds for this hotel room part (optional - if you want to replace)
      await this.prisma.hotelRoomPartBed.deleteMany({
        where: { hotelRoomPartId: createHotelRoomPartBedsDto.hotelRoomPartId },
      });

      // Create new bed configurations
      const bedsToCreate = createHotelRoomPartBedsDto.bedConfigurations.map(
        (config) => ({
          hotelRoomPartId: createHotelRoomPartBedsDto.hotelRoomPartId,
          bedType: config.bedType,
          roomBedSizeId: config.roomBedSizeId,
          roomBedTypeId: config.roomBedTypeId,
          quantity: 1,
        }),
      );

      // Use transaction to create all beds
      const createdBeds = await this.prisma.$transaction(
        bedsToCreate.map((bedData) =>
          this.prisma.hotelRoomPartBed.create({
            data: bedData,
            include: {
              hotelRoomPart: {
                include: {
                  hotelRoom: true,
                  roomPart: true,
                },
              },
              roomBedSize: true,
              roomBedType: true,
            },
          }),
        ),
      );

      return createdBeds;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to create hotel room part beds');
    }
  }

  async findByHotelRoomPartId(
    hotelRoomPartId: number,
  ): Promise<HotelRoomPartBed[]> {
    return this.prisma.hotelRoomPartBed.findMany({
      where: { hotelRoomPartId },
      // include: {
      //   hotelRoomPart: {
      //     include: {
      //       hotelRoom: true,
      //       roomPart: true,
      //     },
      //   },
      // },
    });
  }

  async deleteByHotelRoomPartId(hotelRoomPartId: number): Promise<void> {
    await this.prisma.hotelRoomPartBed.deleteMany({
      where: { hotelRoomPartId },
    });
  }
}
