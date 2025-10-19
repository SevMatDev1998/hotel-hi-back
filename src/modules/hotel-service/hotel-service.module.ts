import { Module } from '@nestjs/common';
import { HotelServiceService } from './hotel-service.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { HotelServiceController } from './hotel-service.controller';

@Module({
  imports: [PrismaModule],
  controllers: [HotelServiceController],
  providers: [HotelServiceService],
  exports: [HotelServiceService],
})
export class HotelServiceModule { }
