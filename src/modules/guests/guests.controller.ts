import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { GuestsService } from './guests.service';
import { PartnerDto } from './dto/partner.dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('guests')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  @Public()
  @Get('partners/:id')
  getPartnerById(@Param('id', ParseIntPipe) id: number) {
    return this.guestsService.getPartnerById(id);
  }

  @Public()
  @Post('partners/:id')
  async create(
    @Param('id', ParseIntPipe) id: number,
    @Body() partnerDto: PartnerDto,
  ) {
    return this.guestsService.acceptPartnerShip(id, partnerDto);
  }

  params: { partnerId; hotelId };

  @Public()
  @Get('hotelAvailability/dates')
  getHotelAvailabilityWithDatesByPartnerid(
    @Query('hotelId', ParseIntPipe) hotelId: number,
    @Query('partnerId', ParseIntPipe) partnerId: number,
  ) {
    return this.guestsService.getHotelAvailabilityWithDatesByPartnerid(
      hotelId,
      partnerId,
    );
  }
}
