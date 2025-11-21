import { Module } from '@nestjs/common';
import { HotelServicePriceService } from './hotel-service-price.service';
import { HotelServicePriceController } from './hotel-service-price.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [HotelServicePriceController],
  providers: [HotelServicePriceService],
  exports: [HotelServicePriceService],
})
export class HotelServicePriceModule {}
