import { ApiProperty } from '@nestjs/swagger';

export class RoomBedSizeDto {
  @ApiProperty({
    description: 'The unique identifier of the room bed size',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The size of the room bed (in cm)',
    example: '160',
  })
  size: string;

  @ApiProperty({
    description: 'The date when the room bed size was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the room bed size was last updated',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
