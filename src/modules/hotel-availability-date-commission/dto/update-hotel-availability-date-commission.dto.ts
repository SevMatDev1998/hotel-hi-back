import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateHotelAvailabilityDateCommissionsDto {
  @ApiProperty({
    description: 'Room fee commission',
    example: 100.0,
  })
  @IsNumber()
  @IsNotEmpty()
  roomFee: number;

  @ApiProperty({
    description: 'Food fee commission',
    example: 50.0,
  })
  @IsNumber()
  @IsNotEmpty()
  foodFee: number;

  @ApiProperty({
    description: 'Additional fee commission',
    example: 20.0,
  })
  @IsNumber()
  @IsNotEmpty()
  additionalFee: number;

  @ApiProperty({
    description: 'Service fee commission',
    example: 30.0,
  })
  @IsNumber()
  @IsNotEmpty()
  serviceFee: number;
}
