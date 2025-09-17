import { Module } from '@nestjs/common';
import { RoomBedTypesController } from './room-bed-types.controller';
import { RoomBedTypesService } from './room-bed-types.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RoomBedTypesController],
  providers: [RoomBedTypesService],
  exports: [RoomBedTypesService],
})
export class RoomBedTypesModule {}
