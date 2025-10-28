import {
  IsEnum,
  IsOptional,
  IsDateString,
  IsInt,
  IsBoolean,
} from 'class-validator';
import { HotelServiceHourlyAvailabilityType } from '@prisma/client';

export class CreateAvailabilityDto {
  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;

  @IsDateString()
  startMonth: string;

  @IsDateString()
  endMonth: string;

  @IsEnum(HotelServiceHourlyAvailabilityType)
  hourlyAvailabilityTypeId: HotelServiceHourlyAvailabilityType;

  @IsOptional()
  @IsDateString()
  startHour?: string;

  @IsOptional()
  @IsDateString()
  endHour?: string;
}

export class CreateHotelServiceAvailabilityDto {
  @IsInt()
  availabilities: CreateAvailabilityDto[];
}
