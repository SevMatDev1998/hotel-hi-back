import { Module } from '@nestjs/common';
import { HotelRoomPriceService } from './hotel-room-price.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [HotelRoomPriceService],
  exports: [HotelRoomPriceService],
})
export class HotelRoomPriceModule {}
