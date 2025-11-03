import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { NotificationsService } from './notificatons.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get(':hotelId')
  findAll(@Param('hotelId', ParseIntPipe) hotelId: number) {
    return this.notificationsService.findAll(hotelId);
  }
}
