import { ApiProperty } from '@nestjs/swagger';
import { HotelRoomStatus, CompletenessStatus } from '@prisma/client';

export class HotelRoomResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the hotel room',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Name of the hotel room',
    example: 'Deluxe Ocean View Suite',
  })
  name: string;

  @ApiProperty({
    description: 'ID of the hotel this room belongs to',
    example: 1,
  })
  hotelId: number;

  @ApiProperty({
    description: 'ID of the room class/category',
    example: 1,
  })
  roomClassId: number;

  @ApiProperty({
    description: 'ID of the room view type',
    example: 1,
    nullable: true,
  })
  roomViewId: number | null;

  @ApiProperty({
    description: 'Room numbers separated by commas',
    example: '101, 102, 103',
  })
  numbers: string;

  @ApiProperty({
    description: 'Room area description',
    example: '45 sq.m',
  })
  area: string;

  @ApiProperty({
    description: 'Maximum number of main guests',
    example: 2,
  })
  mainGuestQuantity: number;

  @ApiProperty({
    description: 'Maximum number of additional guests',
    example: 1,
  })
  additionalGuestQuantity: number;

  @ApiProperty({
    description: 'Current status of the hotel room',
    example: HotelRoomStatus.Active,
    enum: HotelRoomStatus,
  })
  status: HotelRoomStatus;

  @ApiProperty({
    description: 'Total number of room numbers available',
    example: 3,
  })
  roomNumberQuantity: number;

  @ApiProperty({
    description: 'Completeness status of room setup',
    example: CompletenessStatus.Completed,
    enum: CompletenessStatus,
  })
  completeness: CompletenessStatus;

  @ApiProperty({
    description: 'Date when the room was created',
    example: '2025-09-17T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the room was last updated',
    example: '2025-09-17T10:30:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Date when the room was deleted (soft delete)',
    example: null,
    nullable: true,
  })
  deletedAt: Date | null;
}
