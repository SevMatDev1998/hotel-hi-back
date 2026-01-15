import { Module } from '@nestjs/common';
import { HotelAvailabilityController } from './hotel-availability.controller';
import { HotelAvailabilityService } from './hotel-availability.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { HotelAgeAssignmentModule } from '../hotel-age-assignment/hotel-age-assignment.module';
import { I18nService } from '../../i18n/i18n.service';

@Module({
  imports: [PrismaModule, HotelAgeAssignmentModule],
  controllers: [HotelAvailabilityController],
  providers: [HotelAvailabilityService, I18nService],
  exports: [HotelAvailabilityService],
})
export class HotelAvailabilityModule {}
