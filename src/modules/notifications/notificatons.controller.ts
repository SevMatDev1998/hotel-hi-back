import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { NotificationsService } from './notificatons.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get(':hotelId')
  findAll(@Param('hotelId', ParseIntPipe) hotelId: number) {
    return this.notificationsService.findAll(hotelId);
  }

  @Get(':hotelId/:partnerId/commissions')
  getPartnerCommissions(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Param('partnerId', ParseIntPipe) partnerId: number,
  ) {
    return this.notificationsService.getPartnerCommissions(hotelId, partnerId);
  }

  @Post('partner-commissions')
  savePartnerCommissions(
    @Body() body: { partnerId: number; availabilityIds: number[] },
  ) {
    return this.notificationsService.savePartnerCommissions(
      body.partnerId,
      body.availabilityIds,
    );
  }

  @Post('send-notification/:hotelId/:partnerId')
  sendNotification(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Param('partnerId', ParseIntPipe) partnerId: number,
  ) {
    return this.notificationsService.sendPartnerNotification(
      hotelId,
      partnerId,
    );
  }
}
