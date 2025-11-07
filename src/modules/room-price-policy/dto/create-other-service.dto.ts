import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsBoolean,
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsPositive,
} from 'class-validator';

export class CreateOtherServiceDto {
  @ApiProperty({
    description: 'System Service ID (from SystemService table)',
    example: 42,
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
    description: 'Service price (can be null for variable pricing)',
    example: 2000,
    nullable: true,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  price: number | null;

  @ApiProperty({
    description: 'Whether price is not constant',
    example: false,
  })
  @IsBoolean()
  notConstantValue: boolean;

  @ApiProperty({
    description: 'Service name',
    example: 'Food delivery',
  })
  @IsString()
  serviceName: string;

  @ApiProperty({
    description: 'Whether service is time limited',
    example: false,
  })
  @IsBoolean()
  isTimeLimited: boolean;
}
