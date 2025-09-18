import { ApiProperty } from '@nestjs/swagger';
import { FoodType } from '../../../common/enums';

export class HotelFoodResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  hotelId: number;

  @ApiProperty({ enum: FoodType })
  foodType: FoodType;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: () => [CuisineResponseDto] })
  cuisines?: CuisineResponseDto[];

  @ApiProperty({ type: () => [FoodOfferTypeResponseDto] })
  foodOfferTypes?: FoodOfferTypeResponseDto[];
}

export class CuisineResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}

export class FoodOfferTypeResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
