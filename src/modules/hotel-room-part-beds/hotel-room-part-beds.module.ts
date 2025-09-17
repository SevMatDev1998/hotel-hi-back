import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { HotelRoomPartBedsController } from './hotel-room-part-beds.controller';
import { HotelRoomPartBedsService } from './hotel-room-part-beds.service';

@Module({
  imports: [PrismaModule],
  controllers: [HotelRoomPartBedsController],
  providers: [HotelRoomPartBedsService],
  exports: [HotelRoomPartBedsService],
})
export class HotelRoomPartBedsModule {}
