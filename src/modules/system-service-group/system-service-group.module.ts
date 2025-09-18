import { Module } from '@nestjs/common';
import { SystemServiceGroupService } from './system-service-group.service';
import { SystemServiceGroupController } from './system-service-group.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SystemServiceGroupController],
  providers: [SystemServiceGroupService],
  exports: [SystemServiceGroupService],
})
export class SystemServiceGroupModule {}
