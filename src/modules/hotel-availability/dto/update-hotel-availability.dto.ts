import {
  IsNotEmpty,
  ValidateNested,
  IsArray,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { HotelAgeAssignmentDto } from 'src/modules/hotel-age-assignment/dto/hotel-age-assignment.dto';

export class UpdateHotelAvailabilityDto {
  @ApiProperty({ description: 'Availability title', example: 'Summer Season' })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Check-in time',
    example: '2024-01-01T00:00:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  @IsNotEmpty()
  checkInTime: string;

  @ApiProperty({
    description: 'Checkout time',
    example: '2024-12-31T23:59:59.999Z',
    type: 'string',
    format: 'date-time',
  })
  @IsNotEmpty()
  checkoutTime: string;

  @ApiProperty({
    description: 'Hotel age assignments',
    type: [HotelAgeAssignmentDto],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HotelAgeAssignmentDto)
  hotelAgeAssignments?: HotelAgeAssignmentDto[];
}
