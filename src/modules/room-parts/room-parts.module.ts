import { Module } from '@nestjs/common';
import { RoomPartsController } from './room-parts.controller';
import { RoomPartsService } from './room-parts.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RoomPartsController],
  providers: [RoomPartsService],
  exports: [RoomPartsService],
})
export class RoomPartsModule {}
