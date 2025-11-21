import { Body, Controller, Post } from '@nestjs/common';
import { HotelServicePriceService } from './hotel-service-price.service';

interface CreateServicePriceDto {
  hotelServiceId: number;
  hotelAvailabilityId: number;
  price: number;
  dateFrom: string;
  dateTo: string;
}

interface CreateBulkServicePriceRequest {
  prices: CreateServicePriceDto[];
}

@Controller('hotel-service-prices')
export class HotelServicePriceController {
  constructor(
    private readonly hotelServicePriceService: HotelServicePriceService,
  ) {}

  @Post('bulk')
  createBulk(@Body() request: CreateBulkServicePriceRequest): Promise<unknown> {
    return this.hotelServicePriceService.createBulk(request.prices);
  }
}
