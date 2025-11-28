import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Hotel as PrismaHotel } from '@prisma/client';

export type GetHotelLegalInfoDto = Pick<
  PrismaHotel,
  | 'legalPerson'
  | 'registerCountryId'
  | 'registerCity'
  | 'tinNumber'
  | 'director'
  | 'priceSendEmail'
>;

export class UpdateHotelLegalInfoDto {
  @IsOptional()
  @IsString()
  legalPerson?: string;

  @IsOptional()
  @IsNumber()
  registerCountryId?: number | null;

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
  bankPhoneNumber?: string;
}
