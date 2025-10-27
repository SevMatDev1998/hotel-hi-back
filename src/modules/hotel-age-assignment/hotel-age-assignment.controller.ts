import { Controller, Get, Param } from '@nestjs/common';
import { HotelAgeAssignmentService } from './hotel-age-assignment.service';

@Controller('hotel-age-assignments')
export class HotelAgeAssignmentController {
  constructor(
    private readonly hotelAgeAssignmentService: HotelAgeAssignmentService,
  ) {}

  @Get('/hotelAvailability/:hotelAvailabilityId')
  async findByHotelAvailabilityId(
    @Param('hotelAvailabilityId') hotelAvailabilityId: number,
  ) {
    return this.hotelAgeAssignmentService.findByHotelAvailabilityId(
      hotelAvailabilityId,
    );
  }
}
