import { Module } from '@nestjs/common';
import { SystemServiceService } from './system-service.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SystemServiceService],
  exports: [SystemServiceService],
})
export class SystemServiceModule {}
