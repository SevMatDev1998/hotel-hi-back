import { Module } from '@nestjs/common';
import { HotelAvailabilityController } from './hotel-availability.controller';
import { HotelAvailabilityService } from './hotel-availability.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HotelAvailabilityController],
  providers: [HotelAvailabilityService],
  exports: [HotelAvailabilityService],
})
export class HotelAvailabilityModule {}
