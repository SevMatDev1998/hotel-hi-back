import {
  Controller,
  Put,
  Body,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { HotelAvailabilityDateCommissionService } from './hotel-availability-date-commission.service';
import { UpdateHotelAvailabilityDateCommissionsDto } from './dto';

@ApiTags('hotel-availability-date-commission')
@Controller('hotel-availability-date-commissions')
export class HotelAvailabilityDateCommissionController {
  constructor(
    private readonly service: HotelAvailabilityDateCommissionService,
  ) {}

  @Put('/:hotelAvailabilityId')
  @ApiOperation({
    summary: 'Update all date commissions for a hotel availability',
  })
  @ApiParam({
    name: 'hotelAvailabilityId',
    type: Number,
    description: 'The ID of the hotel availability',
  })
  @ApiResponse({
    status: 200,
    description: 'Date commissions have been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Hotel availability not found.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async updateByHotelAvailabilityId(
    @Param('hotelAvailabilityId', ParseIntPipe) hotelAvailabilityId: number,
    @Body() dto: UpdateHotelAvailabilityDateCommissionsDto,
  ): Promise<{ message: string; updated: number }> {
    return this.service.updateByHotelAvailabilityId(hotelAvailabilityId, dto);
  }

  @Delete('/:hotelAvailabilityId')
  @ApiOperation({
    summary: 'Delete all date commissions by hotel availability ID',
  })
  @ApiParam({
    name: 'hotelAvailabilityId',
    type: Number,
    description: 'The ID of the hotel availability',
  })
  @ApiResponse({
    status: 200,
    description: 'Date commissions have been successfully deleted.',
  })
  async deleteByHotelAvailabilityId(
    @Param('hotelAvailabilityId', ParseIntPipe) hotelAvailabilityId: number,
  ): Promise<{ message: string; deleted: number }> {
    return this.service.deleteByHotelAvailabilityId(hotelAvailabilityId);
  }
}
