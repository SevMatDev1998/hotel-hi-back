import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsBoolean,
  IsString,
  IsNumber,
  IsOptional,
  Min,
  Max,
  IsPositive,
} from 'class-validator';

export class CreateHotelAdditionalServiceDto {
  @ApiProperty({
    description: 'System Service ID (from SystemService table)',
    example: 40,
  })
  @IsInt()
  @IsPositive()
  systemServiceId: number;

  @ApiProperty({
    description: 'Hotel availability ID',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  hotelAvailabilityId: number;

  @ApiPropertyOptional({
    description: 'Hotel room ID (optional)',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @IsPositive()
  hotelRoomId?: number;

  @ApiProperty({
    description: 'Whether service is time limited',
    example: true,
  })
  @IsBoolean()
  isTimeLimited: boolean;

  @ApiPropertyOptional({
    description: 'Start time for time-limited services (ISO DateTime string)',
    example: '2025-11-07T21:35:00.000Z',
  })
  @IsOptional()
  @IsString()
  startTime?: string;

  @ApiPropertyOptional({
    description: 'Percentage for arrival/departure services',
    example: 44,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(100)
  percentage?: number;

  @ApiProperty({
    description: 'Service name',
    example: 'Arrival',
  })
  @IsString()
  serviceName: string;

  @ApiPropertyOptional({
    description: 'Service price (for non-percentage based services)',
    example: 2000,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @ApiPropertyOptional({
    description: 'Whether price is not constant',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  notConstantValue?: boolean;
}
