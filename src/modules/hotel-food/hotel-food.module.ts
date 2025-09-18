import { Module } from '@nestjs/common';
import { HotelFoodController } from './hotel-food.controller';
import { HotelFoodService } from './hotel-food.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HotelFoodController],
  providers: [HotelFoodService],
  exports: [HotelFoodService],
})
export class HotelFoodModule {}
