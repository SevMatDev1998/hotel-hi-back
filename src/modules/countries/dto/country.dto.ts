import { ApiProperty } from '@nestjs/swagger';

export class CountryDto {
  @ApiProperty({
    description: 'The unique identifier of the country',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the country',
    example: 'Armenia',
  })
  name: string;

  @ApiProperty({
    description: 'The country code',
    example: 'AM',
  })
  code: string;

  @ApiProperty({
    description: 'The date when the country was created',
    example: '2023-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the country was last updated',
    example: '2023-01-01T00:00:00.000Z',
  })
  updatedAt: Date;
}
