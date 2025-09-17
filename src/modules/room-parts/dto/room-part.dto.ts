import { ApiProperty } from '@nestjs/swagger';

export class RoomPartDto {
  @ApiProperty({
    description: 'The unique identifier of the room part',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the room part',
    example: 'Bedroom',
  })
  name: string;

  @ApiProperty({
    description: 'The date when the room part was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the room part was last updated',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
