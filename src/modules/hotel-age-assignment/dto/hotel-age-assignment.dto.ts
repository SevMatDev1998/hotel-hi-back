import { BedType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class HotelAgeAssignmentDto {
  @IsNotEmpty()
  @IsInt()
  hotelAvailabilityId: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(150)
  fromAge: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(150)
  toAge?: number;

  @IsNotEmpty()
  @IsEnum(BedType)
  bedType: BedType;

  @IsOptional()
  @IsBoolean()
  isAdditional?: boolean;
}
