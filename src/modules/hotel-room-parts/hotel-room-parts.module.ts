import { Module } from '@nestjs/common';
import { HotelRoomPartsService } from './hotel-room-parts.service';
import { HotelRoomPartsController } from './hotel-room-parts.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HotelRoomPartsController],
  providers: [HotelRoomPartsService],
  exports: [HotelRoomPartsService],
})
export class HotelRoomPartsModule {}
