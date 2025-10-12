import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Param,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HotelRoomService } from './hotel-room.service';
import { CreateHotelRoomDto } from './dto';
import { HotelRoom } from '@prisma/client';

@ApiTags('Hotel Rooms')
@Controller('hotel-rooms')
export class HotelRoomController {
  constructor(private readonly hotelRoomService: HotelRoomService) {}

  @Post('/create/:hotelId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new hotel room',
    description: 'Creates a new hotel room with the provided details',
  })
  async create(
    @Param('hotelId', ParseIntPipe) hotelId: number, // <-- Param belongs here
    @Body() createHotelRoomDto: CreateHotelRoomDto,
  ): Promise<HotelRoom> {
    return this.hotelRoomService.create(hotelId, createHotelRoomDto);
  }

  @Get(':hotelId')
  async findAll(
    @Param('hotelId', ParseIntPipe) hotelId: number,
  ): Promise<HotelRoom[]> {
    return this.hotelRoomService.getHotelRoomsByHotelId(hotelId);
  }
}
