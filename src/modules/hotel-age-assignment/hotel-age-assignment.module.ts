import { Module } from '@nestjs/common';
import { HotelAgeAssignmentService } from './hotel-age-assignment.service';

@Module({
  providers: [HotelAgeAssignmentService],
  exports: [HotelAgeAssignmentService],
})
export class HotelAgeAssignmentModule {}
