import { IsString, IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHotelRoomDto {
  // @ApiProperty({
  //   description: 'ID of the hotel this room belongs to',
  //   example: 1,
  //   type: Number,
  // })
  // @IsInt()
  // hotelId: number;

  @ApiProperty({
    description: 'ID of the room class/category',
    example: 1,
    type: Number,
  })
  @IsInt()
  roomClassId: number;

  @ApiPropertyOptional({
    description: 'ID of the room view type (optional)',
    example: 1,
    type: Number,
  })
  @IsOptional()
  @IsInt()
  roomViewId?: number;

  @ApiProperty({
    description: 'Total number of room numbers available',
    example: 3,
    minimum: 1,
    type: Number,
  })
  @IsInt()
  @Min(1)
  roomNumberQuantity: number;

  @ApiProperty({
    description: 'Room area description',
    example: '45 sq.m',
    type: String,
  })
  @IsString()
  area: string;

  // @ApiProperty({
  //   description: 'Name of the hotel room',
  //   example: 'Deluxe Ocean View Suite',
  //   type: String,
  // })
  // @IsString()
  // name: string;

  // @ApiProperty({
  //   description: 'Room numbers separated by commas',
  //   example: '101, 102, 103',
  //   type: String,
  // })
  // @IsString()
  // numbers: string;

  // @ApiProperty({
  //   description: 'Maximum number of main guests',
  //   example: 2,
  //   minimum: 1,
  //   type: Number,
  // })
  // @IsInt()
  // @Min(1)
  // mainGuestQuantity: number;

  // @ApiProperty({
  //   description: 'Maximum number of additional guests',
  //   example: 1,
  //   minimum: 0,
  //   type: Number,
  // })
  // @IsInt()
  // @Min(0)
  // additionalGuestQuantity: number;

  // @ApiProperty({
  //   description: 'Current status of the hotel room',
  //   example: HotelRoomStatus.Active,
  //   enum: HotelRoomStatus,
  //   enumName: 'HotelRoomStatus',
  // })
  // @IsEnum(HotelRoomStatus)
  // status: HotelRoomStatus;

  // @ApiProperty({
  //   description: 'Completeness status of room setup',
  //   example: CompletenessStatus.Completed,
  //   enum: CompletenessStatus,
  //   enumName: 'CompletenessStatus',
  // })
  // @IsEnum(CompletenessStatus)
  // completeness: CompletenessStatus;
}
