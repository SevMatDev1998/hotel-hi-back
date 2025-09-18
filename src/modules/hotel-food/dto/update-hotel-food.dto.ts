import { PartialType } from '@nestjs/swagger';
import { CreateHotelFoodDto } from './create-hotel-food.dto';

export class UpdateHotelFoodDto extends PartialType(CreateHotelFoodDto) {}
