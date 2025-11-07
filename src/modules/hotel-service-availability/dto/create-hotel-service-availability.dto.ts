import {
  IsEnum,
  IsOptional,
  IsDateString,
  IsBoolean,
  IsArray,
  ValidateNested,
  Matches,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { HotelServiceHourlyAvailabilityType } from '@prisma/client';

export class AvailabilityPeriodDto {
  @IsDateString()
  startMonth!: string;

  @IsDateString()
  endMonth!: string;

  @IsEnum(HotelServiceHourlyAvailabilityType)
  hourlyAvailabilityTypeId!: HotelServiceHourlyAvailabilityType;

  @ValidateIf(
    (o) =>
      o.hourlyAvailabilityTypeId === HotelServiceHourlyAvailabilityType.Hours,
  )
  @Matches(/^\d{2}:\d{2}$/, { message: 'startHour must be HH:mm format' })
  @IsOptional()
  startHour?: string;

  @ValidateIf(
    (o) =>
      o.hourlyAvailabilityTypeId === HotelServiceHourlyAvailabilityType.Hours,
  )
  @Matches(/^\d{2}:\d{2}$/, { message: 'endHour must be HH:mm format' })
  @IsOptional()
  endHour?: string;
}

export class AvailabilityGroupDto {
  @IsBoolean()
  @IsOptional()
  isPaid?: boolean;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailabilityPeriodDto)
  periods!: AvailabilityPeriodDto[];
}

export class CreateHotelServiceAvailabilityDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AvailabilityGroupDto)
  availabilities!: AvailabilityGroupDto[];
}
