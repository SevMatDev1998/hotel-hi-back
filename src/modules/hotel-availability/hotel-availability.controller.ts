import { Controller, Post, Body } from '@nestjs/common';
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

  @Post()
  @ApiOperation({ summary: 'Create hotel availability' })
  @ApiResponse({
    status: 201,
    description: 'Hotel availability has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(
    @Body() createHotelAvailabilityDto: CreateHotelAvailabilityDto,
  ): Promise<HotelAvailability> {
    return this.hotelAvailabilityService.create(createHotelAvailabilityDto);
  }
}
