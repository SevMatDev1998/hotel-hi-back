import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HotelFoodService } from './hotel-food.service';
import { CreateHotelFoodDto, UpdateHotelFoodDto } from './dto';

@ApiTags('Hotel Food')
@Controller('hotel-food')
export class HotelFoodController {
  constructor(private readonly hotelFoodService: HotelFoodService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new hotel food service' })
  @ApiResponse({ status: 201, description: 'Hotel food service created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createHotelFoodDto: CreateHotelFoodDto) {
    return this.hotelFoodService.create(createHotelFoodDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all hotel food services' })
  @ApiQuery({ name: 'hotelId', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Hotel food services retrieved successfully.' })
  findAll(@Query('hotelId', new ParseIntPipe({ optional: true })) hotelId?: number) {
    return this.hotelFoodService.findAll(hotelId);
  }

  @Get('hotel/:hotelId')
  @ApiOperation({ summary: 'Get all food services for a specific hotel' })
  @ApiResponse({ status: 200, description: 'Hotel food services retrieved successfully.' })
  findByHotel(@Param('hotelId', ParseIntPipe) hotelId: number) {
    return this.hotelFoodService.findByHotel(hotelId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a hotel food service by ID' })
  @ApiResponse({ status: 200, description: 'Hotel food service retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Hotel food service not found.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hotelFoodService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a hotel food service' })
  @ApiResponse({ status: 200, description: 'Hotel food service updated successfully.' })
  @ApiResponse({ status: 404, description: 'Hotel food service not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHotelFoodDto: UpdateHotelFoodDto,
  ) {
    return this.hotelFoodService.update(id, updateHotelFoodDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a hotel food service' })
  @ApiResponse({ status: 200, description: 'Hotel food service deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Hotel food service not found.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.hotelFoodService.remove(id);
  }
}
