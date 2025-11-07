import { Module } from '@nestjs/common';
import { RoomPricePolicyController } from './room-price-policy.controller';
import { RoomPricePolicyService } from './room-price-policy.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { HotelFoodPriceModule } from '../hotel-food-price/hotel-food-price.module';
import { HotelRoomPriceModule } from '../hotel-room-price/hotel-room-price.module';
import { HotelAdditionalServiceModule } from '../hotel-additional-service/hotel-additional-service.module';
import { HotelServiceModule } from '../hotel-service/hotel-service.module';

@Module({
  imports: [
    PrismaModule,
    HotelFoodPriceModule,
    HotelRoomPriceModule,
    HotelAdditionalServiceModule,
    HotelServiceModule,
  ],
  controllers: [RoomPricePolicyController],
  providers: [RoomPricePolicyService],
  exports: [RoomPricePolicyService],
})
export class RoomPricePolicyModule {}
