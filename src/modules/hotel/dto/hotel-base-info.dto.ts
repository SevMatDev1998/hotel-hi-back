import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class GetHotelBaseInfoDto {
  name: string;
  id: number;
  contactPerson: string;
  phoneCode: number;
  phoneNumber: string;
  countryId: number;
  state: string;
  currencyId: number;
}

export class UpdateHotelBaseInfoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsNumber()
  countryId?: number;

    @IsOptional()
  @IsString()
  city?: string;

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
  currencyId?: number;

}
