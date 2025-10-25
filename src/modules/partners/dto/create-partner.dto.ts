import {
  IsString,
  IsEmail,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { LegalEntityType } from '@prisma/client';

export class CreatePartnerDto {
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

  @IsString()
  countryId: string;

  @IsEnum(LegalEntityType)
  legalEntityTypeId: LegalEntityType;

  @IsBoolean()
  @IsOptional()
  isSystem?: boolean;
}
