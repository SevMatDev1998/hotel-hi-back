import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { HotelServiceAvailabilityService } from './hotel-service-availability.service';
import { CreateHotelServiceAvailabilityDto } from './dto';
import { HotelServiceAvailability } from '@prisma/client';

@Controller('hotel-service-availability')
export class HotelServiceAvailabilityController {
  constructor(
    private readonly hotelServiceAvailabilityService: HotelServiceAvailabilityService,
  ) { }

  @Get('/:hotelServiceId')
  async findByhotelServiceId(
    @Param('hotelServiceId') hotelServiceId: number,
  ): Promise<HotelServiceAvailability | null> {
    return this.hotelServiceAvailabilityService.findByhotelServiceId(
      hotelServiceId,
    );
  };


  @Post()
  async create(@Body() createDto: CreateHotelServiceAvailabilityDto) {
    return this.hotelServiceAvailabilityService.createHotelServiceWithAvailabilities(
      createDto,
    );
  }
}
