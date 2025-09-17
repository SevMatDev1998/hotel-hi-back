import { IsString, IsOptional, IsNumber } from 'class-validator';

export class GetHotelLegalInfoDto {
  id: number;
  registerCountryId: number | null;
  registerState: string | null;
  registerCity: string | null;
  tinNumber: string;
  director: string;
  legalPerson: string | null;
  extractUrl: string | null;
}

export class UpdateHotelLegalInfoDto {
  @IsOptional()
  @IsNumber()
  registerCountryId?: number;

  @IsOptional()
  @IsString()
  registerState?: string;

  @IsOptional()
  @IsString()
  registerCity?: string;

  @IsOptional()
  @IsString()
  tinNumber?: string;

  @IsOptional()
  @IsString()
  director?: string;
}
