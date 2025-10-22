import {
  Controller,
  Post,
  Body,
  ParseIntPipe,
  Param,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HotelAvailabilityService } from './hotel-availability.service';
import { CreateHotelAvailabilityDto } from './dto/create-hotel-availability.dto';
import { HotelAvailability } from '@prisma/client';

@ApiTags('hotel-availability')
@Controller('hotel-availability')
export class HotelAvailabilityController {
  constructor(
    private readonly hotelAvailabilityService: HotelAvailabilityService,
  ) {}

  @Post('/create/:hotelId')
  @ApiOperation({ summary: 'Create hotel availability' })
  @ApiResponse({
    status: 201,
    description: 'Hotel availability has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(
    @Param('hotelId', ParseIntPipe) hotelId: number, // <-- Param belongs here

    @Body() createHotelAvailabilityDto: CreateHotelAvailabilityDto,
  ): Promise<HotelAvailability> {
    return this.hotelAvailabilityService.create(
      createHotelAvailabilityDto,
      hotelId,
    );
  }

  @Get('/:hotelId')
  @ApiOperation({ summary: 'Get hotel availability by hotel ID' })
  @ApiResponse({
    status: 200,
    description: 'Hotel availability records retrieved successfully.',
  })
  async findByHotelId(
    @Param('hotelId', ParseIntPipe) hotelId: number,
  ): Promise<HotelAvailability[]> {
    return this.hotelAvailabilityService.findByHotelId(hotelId);
  }
}
