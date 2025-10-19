import { Module } from '@nestjs/common';
import { SystemServiceTypeService } from './system-service-type.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { SystemServiceTypeController } from './system-service-type.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SystemServiceTypeController],
  providers: [SystemServiceTypeService],
  exports: [SystemServiceTypeService],
})
export class SystemServiceTypeModule {}
 