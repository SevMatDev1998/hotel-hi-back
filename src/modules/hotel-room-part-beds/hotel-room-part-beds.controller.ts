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
import { CreateHotelRoomPartBedsDto, BatchUpdateHotelRoomPartBedsDto } from './dto';
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

  @Put('/batch-edit')
  @ApiOperation({
    summary: 'Batch update bed configurations for multiple hotel room parts',
    description:
      'Updates bed configurations for multiple hotel room parts in a single request. This will replace any existing bed configurations for each room part.',
  })
  @ApiBody({
    type: BatchUpdateHotelRoomPartBedsDto,
    description: 'Batch bed configuration data',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Bed configurations updated successfully',
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
  async batchUpdate(
    @Body() batchUpdateDto: BatchUpdateHotelRoomPartBedsDto,
  ): Promise<HotelRoomPartBed[]> {
    return this.hotelRoomPartBedsService.batchUpdate(batchUpdateDto);
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
