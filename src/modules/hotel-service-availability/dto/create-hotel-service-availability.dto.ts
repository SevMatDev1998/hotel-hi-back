import { IsEnum, IsOptional, IsDateString, IsInt } from 'class-validator';
import {
  ServiceTypeAvailabilityBy,
  HotelServiceHourlyAvailabilityType,
  ServicePayMethod,
} from '@prisma/client';

export class CreateAvailabilityDto {
  @IsEnum(ServiceTypeAvailabilityBy)
  availabilityTypeId: ServiceTypeAvailabilityBy;

  @IsEnum(HotelServiceHourlyAvailabilityType)
  hourlyAvailabilityTypeId: HotelServiceHourlyAvailabilityType;

  @IsEnum(ServicePayMethod)
  payMethodId: ServicePayMethod;

  @IsOptional()
  @IsDateString()
  startTime?: string;

  @IsOptional()
  @IsDateString()
  endTime?: string;
}

export class CreateHotelServiceAvailabilityDto {
  @IsInt()
  hotelId: number;

  @IsInt()
  serviceId: number;

  availabilities: CreateAvailabilityDto[];
}
