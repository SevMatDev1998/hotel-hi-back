import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsArray, ValidateNested, IsPositive, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateHotelAgeAssignmentPriceDto {
  @ApiProperty({ description: 'Hotel room ID', example: 1 })
  @IsInt()
  hotelRoomId: number;

  @ApiProperty({ description: 'Hotel age assignment ID', example: 1 })
  @IsInt()
  hotelAgeAssignmentId: number;

  @ApiProperty({ description: 'Price', example: 100 })
  @IsNumber()
  price: number;
}
