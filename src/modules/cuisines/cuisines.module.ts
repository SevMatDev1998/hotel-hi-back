import { Module } from '@nestjs/common';
import { CuisinesService } from './cuisines.service';
import { CuisinesController } from './cuisines.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CuisinesController],
  providers: [CuisinesService],
  exports: [CuisinesService],
})
export class CuisinesModule {}
