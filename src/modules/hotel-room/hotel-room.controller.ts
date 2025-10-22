import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Param,
  ParseIntPipe,
  Get,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { HotelRoomService } from './hotel-room.service';
import { CreateHotelRoomDto } from './dto';
import { HotelRoom } from '@prisma/client';
import { EditHotelRoomDto } from './dto/edit-hotel-room.dto';

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

  @Put('/edit/:roomId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Edit an existing hotel room',
    description: 'Edits an existing hotel room with the provided details',
  })
  @UsePipes(
    new ValidationPipe({ whitelist: false, forbidNonWhitelisted: false }),
  )
  async edit(
    @Param('roomId', ParseIntPipe) roomId: number, // <-- Param belongs here
    @Body() editHotelRoomDto: EditHotelRoomDto,
  ): Promise<HotelRoom> {
    return this.hotelRoomService.edit(roomId, editHotelRoomDto);
  }

  @Get('hotel/:hotelId')
  async findAll(
    @Param('hotelId', ParseIntPipe) hotelId: number,
  ): Promise<HotelRoom[]> {
    return this.hotelRoomService.getHotelRoomsByHotelId(hotelId);
  }

  @Get('room/:roomId')
  @ApiOperation({
    summary: 'Get a hotel room by room ID',
    description: 'Retrieves a single hotel room using its room ID',
  })
  async findByRoomId(
    @Param('roomId', ParseIntPipe) roomId: number,
  ): Promise<HotelRoom> {
    return this.hotelRoomService.getHotelRoomById(roomId);
  }
}
