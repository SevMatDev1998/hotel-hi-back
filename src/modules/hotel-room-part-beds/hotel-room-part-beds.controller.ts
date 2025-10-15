import {
  Controller,
  Body,
  Get,
  Param,
  Delete,
  HttpStatus,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { HotelRoomPartBedsService } from './hotel-room-part-beds.service';
import { CreateHotelRoomPartBedsDto } from './dto';
import { HotelRoomPartBed } from './entities';

@ApiTags('Hotel Room Part Beds')
@Controller('hotel-room-part-beds')
export class HotelRoomPartBedsController {
  constructor(
    private readonly hotelRoomPartBedsService: HotelRoomPartBedsService,
  ) {}

  @Put('/edit')
  @ApiOperation({
    summary: 'Create bed configurations for a hotel room part',
    description:
      'Creates multiple bed configurations for a specific hotel room part. This will replace any existing bed configurations.',
  })
  @ApiBody({
    type: CreateHotelRoomPartBedsDto,
    description: 'Bed configuration data',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Bed configurations created successfully',
    type: [HotelRoomPartBed],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Hotel room part, bed size, or bed type not found',
  })
  async create(
    @Body() createHotelRoomPartBedsDto: CreateHotelRoomPartBedsDto,
  ): Promise<HotelRoomPartBed[]> {
    return this.hotelRoomPartBedsService.create(createHotelRoomPartBedsDto);
  }

  @Get('/:roomPartId')
  @ApiOperation({
    summary: 'Get all bed configurations for a hotel room part',
    description:
      'Retrieves all bed configurations associated with a specific hotel room part',
  })
  @ApiParam({
    name: 'hotelRoomPartId',
    description: 'ID of the hotel room part',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Bed configurations retrieved successfully',
    type: [HotelRoomPartBed],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Hotel room part not found',
  })
  async findByHotelRoomPartId(
    @Param('roomPartId', ParseIntPipe) roomPartId: number,
  ): Promise<HotelRoomPartBed[]> {
    return this.hotelRoomPartBedsService.findByHotelRoomPartId(roomPartId);
  }

  @Delete('/:roomPartId')
  @ApiOperation({
    summary: 'Delete all bed configurations for a hotel room part',
    description:
      'Removes all bed configurations associated with a specific hotel room part',
  })
  @ApiParam({
    name: 'hotelRoomPartId',
    description: 'ID of the hotel room part',
    type: Number,
    example: 1,
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Bed configurations deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Hotel room part not found',
  })
  async deleteByHotelRoomPartId(
    @Param('hotelRoomPartId', ParseIntPipe) hotelRoomPartId: number,
  ): Promise<void> {
    return this.hotelRoomPartBedsService.deleteByHotelRoomPartId(
      hotelRoomPartId,
    );
  }
}
