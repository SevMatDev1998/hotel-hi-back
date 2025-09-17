import { Module } from '@nestjs/common';
import { RoomClassesController } from './room-classes.controller';
import { RoomClassesService } from './room-classes.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RoomClassesController],
  providers: [RoomClassesService],
  exports: [RoomClassesService],
})
export class RoomClassesModule {}
