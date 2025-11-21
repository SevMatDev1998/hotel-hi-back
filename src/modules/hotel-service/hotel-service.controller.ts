import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { HotelServiceService } from './hotel-service.service';

@Controller('hotel-services')
export class HotelServiceController {
  constructor(private readonly hotelServiceService: HotelServiceService) {}

  @Get('/hotels/:hotelId')
  async findByHotelId(
    @Param('hotelId') hotelId: number,
    @Query('serviceTypeId') serviceTypeId: number,
  ): Promise<any[]> {
    return this.hotelServiceService.findByHotelId(hotelId, serviceTypeId);
  }

  @Post('/hotels')
  async createHotelService(
    @Query('hotelId') hotelId: number,
    @Query('hotelServiceId') serviceId: number,
  ): Promise<any> {
    return this.hotelServiceService.createHotelService(hotelId, serviceId);
  }

  @Delete('/hotels/:hotelServiceId')
  async deleteHotelService(
    @Param('hotelServiceId') hotelServiceId: number,
  ): Promise<any> {
    return this.hotelServiceService.deleteHotelService(hotelServiceId);
  }

  @Get('/paid-grouped/:hotelId')
  getPaidServicesGrouped(
    @Param('hotelId') hotelId: number,
    @Query('availabilityId') availabilityId: number,
  ): Promise<unknown> {
    return this.hotelServiceService.getPaidServicesGrouped(
      hotelId,
      availabilityId,
    );
  }
}
