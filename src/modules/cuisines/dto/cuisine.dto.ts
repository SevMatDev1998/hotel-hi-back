import { ApiProperty } from '@nestjs/swagger';

export class CuisineDto {
  @ApiProperty({
    description: 'The unique identifier of the cuisine',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the cuisine',
    example: 'Italian',
  })
  name: string;

  @ApiProperty({
    description: 'The date when the cuisine was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the cuisine was last updated',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
