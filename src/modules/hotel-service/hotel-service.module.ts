import { Module } from '@nestjs/common';
import { HotelServiceService } from './hotel-service.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [HotelServiceService],
  exports: [HotelServiceService],
})
export class HotelServiceModule {}
