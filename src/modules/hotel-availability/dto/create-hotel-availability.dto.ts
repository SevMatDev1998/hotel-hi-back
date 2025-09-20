import { IsNotEmpty, IsInt, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHotelAvailabilityDto {
  @ApiProperty({
    description: 'Hotel ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  hotelId: number;

  @ApiProperty({
    description: 'Start date of availability period',
    example: '2024-01-01T00:00:00.000Z',
    type: 'string',
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDateString()
  dateFrom: string;

  @ApiProperty({
    description: 'End date of availability period',
    example: '2024-12-31T23:59:59.999Z',
    type: 'string',
    format: 'date-time',
  })
  @IsNotEmpty()
  @IsDateString()
  dateTo: string;
}
