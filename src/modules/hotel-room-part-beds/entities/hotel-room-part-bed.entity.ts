import { ApiProperty } from '@nestjs/swagger';
import { BedType } from '@prisma/client';

export class HotelRoomPartBed {
  @ApiProperty({
    description: 'Unique identifier for the hotel room part bed',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'ID of the hotel room part this bed belongs to',
    example: 1,
    type: Number,
  })
  hotelRoomPartId: number;

  @ApiProperty({
    description: 'Type of bed (Main, Cradle, Additional)',
    example: 'Main',
    enum: BedType,
    enumName: 'BedType',
  })
  bedType: BedType;

  @ApiProperty({
    description: 'ID of the room bed size',
    example: 1,
    type: Number,
  })
  roomBedSizeId: number;

  @ApiProperty({
    description: 'ID of the room bed type',
    example: 1,
    type: Number,
  })
  roomBedTypeId: number;

  @ApiProperty({
    description: 'Quantity of beds with this configuration',
    example: 2,
    type: Number,
  })
  quantity: number;

  @ApiProperty({
    description: 'Date when the bed configuration was created',
    example: '2023-09-17T10:00:00.000Z',
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date when the bed configuration was last updated',
    example: '2023-09-17T10:00:00.000Z',
    type: Date,
  })
  updatedAt: Date;
}
