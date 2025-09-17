import { Controller, Get } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountryDto } from './dto';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get()
  async findAll(): Promise<CountryDto[]> {
    return this.countriesService.findAll();
  }
}
