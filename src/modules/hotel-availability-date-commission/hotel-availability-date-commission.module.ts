import { Module } from '@nestjs/common';
import { HotelAvailabilityDateCommissionController } from './hotel-availability-date-commission.controller';
import { HotelAvailabilityDateCommissionService } from './hotel-availability-date-commission.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HotelAvailabilityDateCommissionController],
  providers: [HotelAvailabilityDateCommissionService],
  exports: [HotelAvailabilityDateCommissionService],
})
export class HotelAvailabilityDateCommissionModule {}
