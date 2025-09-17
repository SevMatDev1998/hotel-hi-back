import { IsInt, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class RoomPartItem {
  @IsInt()
  roomPartId: number;

  @IsInt()
  @Min(1)
  quantity: number;
}

export class CreateHotelRoomPartsDto {
  @IsInt()
  hotelRoomId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomPartItem)
  roomParts: RoomPartItem[];
}
