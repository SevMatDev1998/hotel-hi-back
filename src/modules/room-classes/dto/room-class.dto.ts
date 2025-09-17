import { ApiProperty } from '@nestjs/swagger';

export class RoomClassDto {
  @ApiProperty({
    description: 'The unique identifier of the room class',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the room class',
    example: 'Standard',
  })
  name: string;

  @ApiProperty({
    description: 'The date when the room class was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the room class was last updated',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
