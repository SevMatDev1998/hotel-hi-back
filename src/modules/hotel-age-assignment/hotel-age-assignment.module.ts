import { Module } from '@nestjs/common';
import { HotelAgeAssignmentService } from './hotel-age-assignment.service';
import { HotelAgeAssignmentController } from './hotel-age-assignment.controller';

@Module({
  providers: [HotelAgeAssignmentService],
  controllers: [HotelAgeAssignmentController],
  exports: [HotelAgeAssignmentService],
})
export class HotelAgeAssignmentModule {}
