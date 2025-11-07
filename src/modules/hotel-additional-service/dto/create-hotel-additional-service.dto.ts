import {
  IsInt,
  IsBoolean,
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsPositive,
} from 'class-validator';

export class CreateHotelAdditionalServiceDto {
  @IsInt()
  @IsPositive()
  hotelServiceId: number;

  @IsInt()
  @IsPositive()
  hotelAvailabilityId: number;

  @IsOptional()
  @IsInt()
  @IsPositive()
  hotelRoomId?: number;

  @IsBoolean()
  isTimeLimited: boolean;

  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  percentage?: number;

  @IsString()
  serviceName: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  @IsOptional()
  @IsBoolean()
  notConstantValue?: boolean;
}
