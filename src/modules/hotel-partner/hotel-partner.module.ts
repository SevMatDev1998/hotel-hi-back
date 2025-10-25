import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PartnersModule } from '../partners/partners.module';
import { HotelPartnerController } from './hotel-partner.controller';
import { HotelPartnerService } from './hotel-partner.service';

@Module({
  imports: [PrismaModule, PartnersModule],
  controllers: [HotelPartnerController],
  providers: [HotelPartnerService],
  exports: [HotelPartnerService],
})
export class HotelPartnerModule {}
