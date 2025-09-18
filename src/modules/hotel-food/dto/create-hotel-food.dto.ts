import { IsEnum, IsNumber, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FoodType } from '../../../common/enums';

export class CreateHotelFoodDto {
  @ApiProperty({ description: 'Hotel ID' })
  @IsNumber()
  hotelId: number;

  @ApiProperty({
    description: 'Type of food service',
    enum: FoodType,
    example: FoodType.Breakfast,
  })
  @IsEnum(FoodType)
  foodType: FoodType;

  @ApiProperty({
    description: 'Array of cuisine IDs',
    type: [Number],
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  cuisineIds: number[];

  @ApiProperty({
    description: 'Array of food offer type IDs',
    type: [Number],
    example: [1, 2, 3],
  })
  @IsArray()
  @IsNumber({}, { each: true })
  foodOfferTypeIds: number[];
}
