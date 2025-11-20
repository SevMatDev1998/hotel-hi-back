import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsArray, ValidateNested, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateHotelFoodPriceDto } from './create-hotel-food-price.dto';
import { CreateHotelRoomPriceDto } from './create-hotel-room-price.dto';
import { CreateHotelAdditionalServiceDto } from './create-hotel-additional-service.dto';
import { CreateOtherServiceDto } from './create-other-service.dto';
import { CreateHotelAgeAssignmentPriceDto } from './create-hotel-age-assignment-price.dto';

export class CreateRoomPricePolicyDto {
  @ApiProperty({
    description: 'Hotel availability ID',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  hotelAvailabilityId: number;

  @ApiProperty({
    description: 'Array of food prices',
    type: [CreateHotelFoodPriceDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHotelFoodPriceDto)
  foodPrices: CreateHotelFoodPriceDto[];

  @ApiProperty({
    description: 'Room price configuration',
    type: CreateHotelRoomPriceDto,
  })
  @ValidateNested()
  @Type(() => CreateHotelRoomPriceDto)
  roomPrice: CreateHotelRoomPriceDto;

  @ApiProperty({
    description: 'Array of arrival/departure services',
    type: [CreateHotelAdditionalServiceDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHotelAdditionalServiceDto)
  arrivalDepartureServices: CreateHotelAdditionalServiceDto[];

  @ApiProperty({
    description: 'Array of other services',
    type: [CreateOtherServiceDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOtherServiceDto)
  otherServices: CreateOtherServiceDto[];

  @ApiProperty({
    description: 'Array of age assignment prices',
    type: [CreateHotelAgeAssignmentPriceDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHotelAgeAssignmentPriceDto)
  hotelAgeAssignmentPrices: CreateHotelAgeAssignmentPriceDto[];
}
