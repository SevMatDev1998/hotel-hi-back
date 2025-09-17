import { Module } from '@nestjs/common';
import { RoomViewsController } from './room-views.controller';
import { RoomViewsService } from './room-views.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RoomViewsController],
  providers: [RoomViewsService],
  exports: [RoomViewsService],
})
export class RoomViewsModule {}
