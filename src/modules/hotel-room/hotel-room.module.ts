import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { HotelRoomController } from './hotel-room.controller';
import { HotelRoomService } from './hotel-room.service';

@Module({
  imports: [PrismaModule],
  controllers: [HotelRoomController],
  providers: [HotelRoomService],
  exports: [HotelRoomService],
})
export class HotelRoomModule {}
