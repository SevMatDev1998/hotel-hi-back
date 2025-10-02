import { ApiProperty } from '@nestjs/swagger';

export class CurrencyDto {
  @ApiProperty({
    description: 'The unique identifier of the currency',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the currency',
    example: 'US Dollar',
  })
  name: string;

  @ApiProperty({
    description: 'The currency code (typically ISO 4217)',
    example: 'USD',
  })
  code: string;

  @ApiProperty({
    description: 'The currency symbol',
    example: '$',
  })
  symbol: string;

  @ApiProperty({
    description: 'The date when the currency was created',
    example: '2023-01-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the currency was last updated',
    example: '2023-01-01T00:00:00.000Z',
    type: String,
    format: 'date-time',
  })
  updatedAt: Date;
}
