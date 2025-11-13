import { Controller, Get } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountryDto } from './dto';
import { Public } from '../auth/decorators/public.decorator';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) { }

  @Public()
  @Get()
  async findAll(): Promise<CountryDto[]> {
    return this.countriesService.findAll();
  }
}
