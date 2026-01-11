import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, Min, IsPositive } from 'class-validator';

export class CreateHotelRoomPriceDto {
  @ApiProperty({
    description: 'Hotel room ID',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  hotelRoomId: number;

  @ApiProperty({
    description: 'Hotel availability ID',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  hotelAvailabilityId: number;

  @ApiProperty({
    description: 'Number of guests',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  guestCount: number;

  @ApiProperty({
    description: 'Room price',
    example: 50000,
  })
  @IsNumber()
  @Min(0)
  price: number;
}
