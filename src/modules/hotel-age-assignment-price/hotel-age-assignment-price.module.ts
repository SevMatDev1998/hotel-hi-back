import { Module } from '@nestjs/common';
import { HotelAgeAssignmentPriceService } from './hotel-age-assignment-price.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [HotelAgeAssignmentPriceService],
  exports: [HotelAgeAssignmentPriceService],
})
export class HotelAgeAssignmentPriceModule {}
