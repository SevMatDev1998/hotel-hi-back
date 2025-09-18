import { Module } from '@nestjs/common';
import { SystemServiceTypeService } from './system-service-type.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SystemServiceTypeService],
  exports: [SystemServiceTypeService],
})
export class SystemServiceTypeModule {}
