import { IsInt, IsNumber, Min, IsPositive } from 'class-validator';

export class CreateHotelRoomPriceDto {
  @IsInt()
  @IsPositive()
  hotelRoomId: number;

  @IsInt()
  @IsPositive()
  hotelAvailabilityId: number;

  @IsNumber()
  @Min(0)
  price: number;
}
