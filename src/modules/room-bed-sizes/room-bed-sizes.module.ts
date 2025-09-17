import { Module } from '@nestjs/common';
import { RoomBedSizesController } from './room-bed-sizes.controller';
import { RoomBedSizesService } from './room-bed-sizes.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RoomBedSizesController],
  providers: [RoomBedSizesService],
  exports: [RoomBedSizesService],
})
export class RoomBedSizesModule {}
