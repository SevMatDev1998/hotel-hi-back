import {
  IsString,
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
} from 'class-validator';
import { LegalEntityType } from '@prisma/client';
import { Transform } from 'class-transformer';

export class UpdatePartnerDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  tin?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  ltd?: string;

  @IsString()
  @IsOptional()
  accountNumber?: string;

  @IsString()
  @IsOptional()
  director?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @Transform(({ value }: { value: string | number }) =>
    typeof value === 'string' ? parseInt(value, 10) : value,
  )
  @IsInt()
  @IsOptional()
  countryId?: number;

  @IsEnum(LegalEntityType)
  @IsOptional()
  legalEntityTypeId?: LegalEntityType;
}
