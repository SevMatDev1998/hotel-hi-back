import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HotelRoomService } from './hotel-room.service';
import { CreateHotelRoomDto } from './dto';
import { HotelRoom } from '@prisma/client';

@ApiTags('Hotel Rooms')
@Controller('hotel-rooms')
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new hotel room',
    description: 'Creates a new hotel room with the provided details',
  })
  async create(
    @Body() createHotelRoomDto: CreateHotelRoomDto,
  ): Promise<HotelRoom> {
    return this.hotelRoomService.create(createHotelRoomDto);
  }
}
