import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CountryDto } from './dto/country.dto';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<CountryDto[]> {
    const countries = await this.prisma.country.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return countries.map((country) => ({
      id: country.id,
      name: country.name,
      code: country.code,
      createdAt: country.createdAt,
      updatedAt: country.updatedAt,
    }));
  }
}
