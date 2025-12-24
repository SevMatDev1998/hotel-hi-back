import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { CreateHotelRoomPartBedsDto } from './create-hotel-room-part-beds.dto';

export class BatchUpdateHotelRoomPartBedsDto {
  @ApiProperty({
    description: 'Array of room part bed configurations to update',
    type: [CreateHotelRoomPartBedsDto],
    example: [
      {
        hotelRoomPartId: 1,
        bedConfigurations: [
          {
            bedType: 'Main',
            roomBedSizeId: 1,
            roomBedTypeId: 1,
          },
        ],
      },
      {
        hotelRoomPartId: 2,
        bedConfigurations: [
          {
            bedType: 'Additional',
            roomBedSizeId: 2,
            roomBedTypeId: 2,
          },
        ],
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateHotelRoomPartBedsDto)
  roomPartBeds: CreateHotelRoomPartBedsDto[];
}
