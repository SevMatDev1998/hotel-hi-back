import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class GetHotelBaseInfoDto {
  name: string;
  contactPerson: string | null;
  phoneCode: number | null;
  phoneNumber: string | null;
  countryId: number | null;
  currencyId: number;
}
export class UpdateHotelBaseInfoDto {
  @ApiProperty({ description: 'Hotel name', example: 'Sevak1234asdasd' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Country id', example: 1, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  countryId?: number;

  @ApiProperty({
    description: 'City',
    example: 'Not specified',
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'Contact person',
    example: 'Hotel Owner',
    required: false,
  })
  @IsOptional()
  @IsString()
  contactPerson?: string;

  @ApiProperty({ description: 'Phone code', example: 374, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  phoneCode?: number;

  @ApiProperty({
    description: 'Phone number',
    example: '0000000012',
    required: false,
  })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty({ description: 'Currency id', example: 1, required: false })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  currencyId?: number;
}
