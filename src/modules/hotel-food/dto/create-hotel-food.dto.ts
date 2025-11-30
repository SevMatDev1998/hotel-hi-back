import { IsNumber, IsArray, IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FoodType } from '../../../common/enums';

export class CreateHotelFoodDto {
  @ApiProperty({ description: 'Hotel ID' })
  @IsNumber()
  hotelId: number;

  @ApiProperty({ description: 'Name of the food service' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the food service',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isFoodAvailable?: boolean;

  @ApiProperty({
    description: 'Type of food service',
    enum: FoodType,
    example: FoodType.Breakfast,
  })
  foodType: FoodType;

  @ApiProperty({ description: 'Start date for the food service' })
  @IsString()
  startDate: string;

  @ApiProperty({ description: 'End date for the food service' })
  @IsString()
  endDate: string;

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
