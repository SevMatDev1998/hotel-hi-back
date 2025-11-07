import { Module } from '@nestjs/common';
import { HotelAdditionalServiceService } from './hotel-additional-service.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [HotelAdditionalServiceService],
  exports: [HotelAdditionalServiceService],
})
export class HotelAdditionalServiceModule {}
