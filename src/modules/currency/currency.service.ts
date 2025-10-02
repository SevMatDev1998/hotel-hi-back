import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CurrencyDto } from './dto';

@Injectable()
export class CurrencyService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<CurrencyDto[]> {
    const currencies = await this.prisma.currency.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    return currencies.map((currency) => ({
      id: currency.id,
      name: currency.name,
      code: currency.code,
      symbol: currency.symbol,
      createdAt: currency.createdAt,
      updatedAt: currency.updatedAt,
    }));
  }
}
