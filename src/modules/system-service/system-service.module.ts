import { Module } from '@nestjs/common';
import { SystemServiceService } from './system-service.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { SystemServiceController } from './system-service.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SystemServiceController],
  providers: [SystemServiceService],
  exports: [SystemServiceService],
})
export class SystemServiceModule {}
