import { ApiProperty } from '@nestjs/swagger';

export class CopyHotelAvailabilityResponseDto {
  @ApiProperty({ description: 'ID of the copied availability', example: 2 })
  id: number;

  @ApiProperty({ description: 'Hotel ID', example: 1 })
  hotelId: number;

  @ApiProperty({
    description: 'New availability title with (Copy) suffix',
    example: 'Summer Season (Copy)',
  })
  title: string;

  @ApiProperty({ description: 'Color for calendar', example: '#FF5733' })
  color: string;

  @ApiProperty({
    description: 'Check-in time',
    example: '2024-01-01T00:00:00.000Z',
  })
  checkInTime: string;

  @ApiProperty({
    description: 'Check-out time',
    example: '2024-12-31T23:59:59.999Z',
  })
  checkoutTime: string;

  @ApiProperty({ description: 'Confirmation status', example: false })
  confirmed: boolean;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
