import { Controller, Get } from '@nestjs/common';
import { CurrencyService } from './currency.service';
import { CurrencyDto } from './dto';

@Controller('currencies')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrencyService) {}

  @Get()
  async findAll(): Promise<CurrencyDto[]> {
    return this.currenciesService.findAll();
  }
}
