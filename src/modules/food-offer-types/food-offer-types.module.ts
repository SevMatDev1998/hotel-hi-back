import { Module } from '@nestjs/common';
import { FoodOfferTypesService } from './food-offer-types.service';
import { FoodOfferTypesController } from './food-offer-types.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FoodOfferTypesController],
  providers: [FoodOfferTypesService],
  exports: [FoodOfferTypesService],
})
export class FoodOfferTypesModule {}
