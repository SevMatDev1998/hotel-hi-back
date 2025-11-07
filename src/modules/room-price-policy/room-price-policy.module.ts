import { Module } from '@nestjs/common';
import { RoomPricePolicyController } from './room-price-policy.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { RoomPricePolicyService } from './room-price-policy.service';

@Module({
  imports: [PrismaModule],
  controllers: [RoomPricePolicyController],
  providers: [RoomPricePolicyService],
  exports: [RoomPricePolicyService],
})
export class RoomPricePolicyModule {}
