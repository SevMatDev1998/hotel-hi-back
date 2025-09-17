import { ApiProperty } from '@nestjs/swagger';

export class RoomBedTypeDto {
  @ApiProperty({
    description: 'The unique identifier of the room bed type',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the room bed type',
    example: 'Queen',
  })
  name: string;

  @ApiProperty({
    description: 'The date when the room bed type was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the room bed type was last updated',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
