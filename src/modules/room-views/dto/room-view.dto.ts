import { ApiProperty } from '@nestjs/swagger';

export class RoomViewDto {
  @ApiProperty({
    description: 'The unique identifier of the room view',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the room view',
    example: 'Sea View',
  })
  name: string;

  @ApiProperty({
    description: 'The date when the room view was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the room view was last updated',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
