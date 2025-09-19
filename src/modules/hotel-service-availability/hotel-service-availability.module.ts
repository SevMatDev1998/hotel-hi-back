import { Module } from '@nestjs/common';
import { HotelServiceAvailabilityController } from './hotel-service-availability.controller';
import { HotelServiceAvailabilityService } from './hotel-service-availability.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { HotelServiceModule } from '../hotel-service/hotel-service.module';

@Module({
  imports: [PrismaModule, HotelServiceModule],
  controllers: [HotelServiceAvailabilityController],
  providers: [HotelServiceAvailabilityService],
  exports: [HotelServiceAvailabilityService],
})
export class HotelServiceAvailabilityModule {}
