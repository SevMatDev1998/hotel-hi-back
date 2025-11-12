import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { GuestsService } from './guests.service';
import { PartnerDto } from './dto/partner.dto';

@Controller('guests')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) { }

  @Get('partners/:id')
  getPartnerById(@Param('id', ParseIntPipe) id: number) {
    return this.guestsService.getPartnerById(id);
  }

  @Post('partners/:id')
  async create(
    @Param('id', ParseIntPipe) id: number,
    @Body() partnerDto: PartnerDto,
  ) {
    return this.guestsService.acceptPartnerShip(id, partnerDto);
  }
}
