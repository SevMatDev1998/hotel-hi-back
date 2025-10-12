import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { HotelRoomPartsService } from './hotel-room-parts.service';
import { CreateHotelRoomPartsDto } from './dto';
import { HotelRoomPart } from '@prisma/client';

@Controller('hotel-room-parts')
export class HotelRoomPartsController {
  constructor(private readonly hotelRoomPartsService: HotelRoomPartsService) {}

  @Post()
  async createRoomParts(
    @Body() createHotelRoomPartsDto: CreateHotelRoomPartsDto,
  ): Promise<HotelRoomPart[]> {
    return this.hotelRoomPartsService.createRoomParts(createHotelRoomPartsDto);
  }

  @Get('/:hotelRoomId')
  async getRoomPartsByHotelRoom(
    @Param('hotelRoomId', ParseIntPipe) hotelRoomId: number,
  ): Promise<HotelRoomPart[]> {
    return this.hotelRoomPartsService.getRoomPartsByHotelRoom(hotelRoomId);
  }

  @Delete(':id')
  async deleteRoomPart(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.hotelRoomPartsService.deleteRoomPart(id);
  }
}
