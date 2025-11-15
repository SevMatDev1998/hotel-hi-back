import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsBoolean,
  IsOptional,
  Min,
  IsPositive,
} from 'class-validator';

export class CreateHotelFoodPriceDto {
  @ApiProperty({
    description: 'Hotel availability ID',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  hotelAvailabilityId: number;

  @IsInt()
  @IsPositive()
  hotelRoomId: number;

  @ApiProperty({
    description: 'Hotel food ID',
    example: 6,
  })
  @IsInt()
  @IsPositive()
  hotelFoodId: number;

  @ApiPropertyOptional({
    description: 'Hotel age assignment ID (required if not included in price)',
    example: 4,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  hotelAgeAssignmentId?: number;

  @ApiProperty({
    description: 'Food price',
    example: 1500,
  })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Whether food is included in price',
    example: false,
  })
  @IsBoolean()
  includedInPrice: boolean;
}
