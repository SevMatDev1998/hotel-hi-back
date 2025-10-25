import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { PartnersService } from '../partners/partners.service';
import { CreatePartnerDto } from '../partners/dto/create-partner.dto';
import { HotelPartnerService } from './hotel-partner.service';

@Controller('hotel-partners')
export class HotelPartnerController {
  constructor(
    private readonly hotelPartnerService: HotelPartnerService,
    private readonly partnersService: PartnersService,
  ) {}

  @Get(':hotelId')
  async findAllByHotelId(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Query('page') page?: number,
    @Query('search') search?: string,
  ) {
    return this.hotelPartnerService.findAllByHotelId(hotelId, { page, search });
  }

  @Post(':hotelId')
  async create(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Body() createPartnerDto: CreatePartnerDto,
  ) {
    return this.hotelPartnerService.create(hotelId, createPartnerDto);
  }
}
