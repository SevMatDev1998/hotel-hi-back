import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHotelAvailabilityDto {
  @ApiProperty({ description: 'Availability title', example: 'Summer Season' })
  @IsNotEmpty()
  title: string;

  // @ApiProperty({ description: 'Calendar color', example: '#FFAA00' })
  // @IsNotEmpty()
  // color: string;

  @ApiProperty({
    description: 'Start date of availability period',
    example: '2024-01-01T00:00:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  @IsNotEmpty()
  // @IsDateString()
  checkInTime: string;

  @ApiProperty({
    description: 'End date of availability period',
    example: '2024-12-31T23:59:59.999Z',
    type: 'string',
    format: 'date-time',
  })
  @IsNotEmpty()
  // @IsDateString()
  checkoutTime: string;
}
