import { ApiProperty } from '@nestjs/swagger';

export class FoodOfferTypeDto {
  @ApiProperty({
    description: 'The unique identifier of the food offer type',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the food offer type',
    example: 'Swedish',
  })
  name: string;

  @ApiProperty({
    description: 'The date when the food offer type was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the food offer type was last updated',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
