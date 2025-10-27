import { IsBoolean, IsDecimal, IsInt, IsOptional } from 'class-validator';

export class CreateHotelFoodPriceDto {
  @IsInt()
  hotelAvailabilityId: number;

  @IsInt()
  @IsOptional()
  hotelAgeAssignmentId?: number;

  @IsInt()
  hotelFoodId: number;

  @IsDecimal()
  price: number;

  @IsBoolean()
  @IsOptional()
  includedInPrice?: boolean;
}
