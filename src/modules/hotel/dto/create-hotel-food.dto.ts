import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEnum,
  IsArray,
  IsNumber,
  IsOptional,
  ArrayMinSize,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { FoodType } from '@prisma/client';

export class CreateHotelFoodDto {
  @ApiProperty({
    description: 'The name of the food item',
    example: 'Breakfast Buffet',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Description of the food item',
    example: 'Continental breakfast with fresh fruits and pastries',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Type of food',
    enum: FoodType,
    example: FoodType.Breakfast,
  })
  @IsEnum(FoodType)
  @Transform(({ value }) => parseInt(value as string))
  foodType: FoodType;

  @ApiProperty({
    description: 'Array of cuisine IDs',
    type: [Number],
    example: [1, 2, 3],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one cuisine must be selected' })
  @IsNumber({}, { each: true })
  @Transform(({ value }) => Array.isArray(value) ? value.map(id => parseInt(id)) : [parseInt(value)])
  cuisineIds: number[];

  @ApiProperty({
    description: 'Array of food offer type IDs',
    type: [Number],
    example: [1, 2],
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one food offer type must be selected' })
  @IsNumber({}, { each: true })
  @Transform(({ value }) => Array.isArray(value) ? value.map(id => parseInt(id)) : [parseInt(value)])
  foodOfferTypeIds: number[];

  @ApiProperty({
    description: 'Hotel ID',
    example: 1,
  })
  @IsNumber()
  hotelId: number;
}
