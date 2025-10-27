import { Module } from '@nestjs/common';
import { HotelFoodPriceService } from './hotel-food-price.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [HotelFoodPriceService],
  exports: [HotelFoodPriceService],
})
export class HotelFoodPriceModule {}
