import { Module } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { CurrenciesController } from './currency.controller';

@Module({
  imports: [PrismaModule],
  controllers: [CurrenciesController],
  providers: [CurrencyService],
  exports: [CurrencyService],
})
export class CurrencyModule {}
