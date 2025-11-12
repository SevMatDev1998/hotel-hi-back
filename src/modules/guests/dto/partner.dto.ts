import {
  IsString,
  IsEmail,
  IsEnum,
  IsBoolean,
  IsOptional,
  IsInt,
} from 'class-validator';
import { LegalEntityType } from '@prisma/client';
import { Transform } from 'class-transformer';

export class PartnerDto {
  @IsEmail()
  email: string;

  @IsString()
  tin: string;

  @IsString()
  name: string;

  @IsString()
  ltd: string;

  @IsString()
  accountNumber: string;

  @IsString()
  director: string;

  @IsString()
  phone: string;

  // @IsEnum(PartnerStatus)
  // status: PartnerStatus;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  countryId: number;

  @IsEnum(LegalEntityType)
  legalEntityTypeId: LegalEntityType;

  @IsBoolean()
  @IsOptional()
  isSystem?: boolean;
}
