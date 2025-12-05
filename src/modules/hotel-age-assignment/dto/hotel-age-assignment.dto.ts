import { BedType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class HotelAgeAssignmentDto {
  @IsOptional()
  @IsInt()
  hotelAvailabilityId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(180)
  fromAge: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(180)
  toAge?: number;

  @IsNotEmpty()
  @IsEnum(BedType)
  bedType: BedType;

  @IsOptional()
  @IsBoolean()
  isAdditional?: boolean;
}
