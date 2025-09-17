import { IsString, IsOptional, IsNumber } from 'class-validator';

export class GetHotelBaseInfoDto {
  id: number;
  contactPerson: string;
  phoneCode: number;
  phoneNumber: string;
  countryId: number;
  state: string;
  city: string;
  currencyId: number;
}

export class UpdateHotelBaseInfoDto {
  @IsOptional()
  @IsString()
  contactPerson?: string;

  @IsOptional()
  @IsNumber()
  phoneCode?: number;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsNumber()
  countryId?: number;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsNumber()
  currencyId?: number;
}
