import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CompletenessStatus } from '@prisma/client';

export class CreateHotelServiceDto {
  @ApiProperty({
    description: 'Hotel ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  hotelId: number;

  @ApiProperty({
    description: 'System Service ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  serviceId: number;

  @ApiProperty({
    description: 'Optional description for the hotel service',
    example: 'Premium spa service with massage',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Service status',
    enum: CompletenessStatus,
    example: CompletenessStatus.Draft,
    required: false,
  })
  @IsOptional()
  @IsEnum(CompletenessStatus)
  statusId?: CompletenessStatus;
}
