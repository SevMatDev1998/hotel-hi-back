import { Controller, Post, Body } from '@nestjs/common';
import { HotelServiceAvailabilityService } from './hotel-service-availability.service';
import { CreateHotelServiceAvailabilityDto } from './dto';

@Controller('hotel-service-availability')
export class HotelServiceAvailabilityController {
  constructor(
    private readonly hotelServiceAvailabilityService: HotelServiceAvailabilityService,
  ) {}

  @Post()
  async create(@Body() createDto: CreateHotelServiceAvailabilityDto) {
    return this.hotelServiceAvailabilityService.createHotelServiceWithAvailabilities(
      createDto,
    );
  }
}
