import { IsString, IsInt, IsOptional, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class EditHotelRoomDto {
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
}
