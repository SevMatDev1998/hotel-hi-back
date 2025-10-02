import { IsString, IsOptional, IsNumber,  } from 'class-validator';

export class GetHotelLegalInfoDto {
  registerCountryId: number | null;
  registerCity: string | null;
  tinNumber: string;
  director: string;
  legalPerson: string | null;
}

export class UpdateHotelLegalInfoDto {
  @IsOptional()
  @IsString()
  legalPerson?: string;

  @IsOptional()
  @IsNumber()
  registerCountryId?: number | null; // Prisma expects number | null

  @IsOptional()
  @IsString()
  registerCity?: string;

  @IsOptional()
  @IsString()
  tinNumber?: string;

  @IsOptional()
  @IsString()
  director?: string;

  @IsOptional()
  @IsString()
  priceSendEmail?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string; // ✅ Fix: match Prisma type (string or nullable string)
}
