import { IsNumber, IsArray, ValidateNested, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class RoomPartItem {
  @IsNumber()
  roomPartId: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}

export class CreateHotelRoomPartsDto {
  @IsNumber()
  hotelRoomId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RoomPartItem)
  roomParts: RoomPartItem[];
}
