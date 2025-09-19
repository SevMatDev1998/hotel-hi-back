import { ApiProperty } from '@nestjs/swagger';
import { CompletenessStatus } from '@prisma/client';

export class HotelServiceDto {
  @ApiProperty({
    description: 'Hotel Service ID',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Hotel ID',
    example: 1,
  })
  hotelId: number;

  @ApiProperty({
    description: 'System Service ID',
    example: 1,
  })
  serviceId: number;

  @ApiProperty({
    description: 'Service description',
    example: 'Premium spa service with massage',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Service status',
    enum: CompletenessStatus,
    example: CompletenessStatus.Draft,
  })
  statusId: CompletenessStatus;

  @ApiProperty({
    description: 'Creation date',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
