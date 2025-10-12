import {
  Controller,
  Get,
  Param,
  Body,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { HotelService } from './hotel.service';
import {
  GetHotelBaseInfoDto,
  UpdateHotelBaseInfoDto,
} from './dto/hotel-base-info.dto';
import {
  GetHotelLegalInfoDto,
  UpdateHotelLegalInfoDto,
} from './dto/hotel-legal-info.dto';

@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  // Base Information Endpoints
  @Get(':id/base-information')
  async getHotelBaseInfo(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetHotelBaseInfoDto> {
    return this.hotelService.getHotelBaseInfo(id);
  }

  @Post(':id/base-information')
  async updateHotelBaseInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateHotelBaseInfoDto,
  ): Promise<GetHotelBaseInfoDto> {
    return this.hotelService.updateHotelBaseInfo(id, updateData);
  }

  // Legal Information Endpoints
  @Get(':id/legal-information')
  async getHotelLegalInfo(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<GetHotelLegalInfoDto> {
    return this.hotelService.getHotelLegalInfo(id);
  }

  @Post(':id/legal-information')
  async updateHotelLegalInfo(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdateHotelLegalInfoDto,
  ): Promise<GetHotelLegalInfoDto> {
    return this.hotelService.updateHotelLegalInfo(id, updateData);
  }

  // Additional hotel endpoints will be added here later
}
