import {
  Controller,
  Post,
  Body,
  ParseIntPipe,
  Param,
  Get,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HotelAvailabilityService } from './hotel-availability.service';
import { CreateHotelAvailabilityDto } from './dto/create-hotel-availability.dto';
import { HotelAvailability } from '@prisma/client';
import { UpdateHotelAvailabilityListDto } from './dto/update-hotel-availability-with-dates.dto';

@ApiTags('hotel-availability')
@Controller('hotel-availability')
export class HotelAvailabilityController {
  constructor(
    private readonly hotelAvailabilityService: HotelAvailabilityService,
  ) {}

  @Post('/create/:hotelId')
  @ApiOperation({ summary: 'Create hotel availability' })
  @ApiResponse({
    status: 201,
    description: 'Hotel availability has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(
    @Param('hotelId', ParseIntPipe) hotelId: number, // <-- Param belongs here
    @Body() createHotelAvailabilityDto: CreateHotelAvailabilityDto,
  ): Promise<HotelAvailability> {
    return this.hotelAvailabilityService.create(
      createHotelAvailabilityDto,
      hotelId,
    );
  }

  @Get('/:hotelId')
  @ApiOperation({ summary: 'Get hotel availability by hotel ID' })
  @ApiResponse({
    status: 200,
    description: 'Hotel availability records retrieved successfully.',
  })
  async findByHotelId(
    @Param('hotelId', ParseIntPipe) hotelId: number,
  ): Promise<HotelAvailability[]> {
    return this.hotelAvailabilityService.findByHotelId(hotelId);
  }

  @Get('/dates/:hotelId')
  @ApiOperation({ summary: 'Get hotel availability by hotel ID' })
  @ApiResponse({
    status: 200,
    description: 'Hotel availability records retrieved successfully.',
  })
  async findByHotelIdWithDates(
    @Param('hotelId', ParseIntPipe) hotelId: number,
  ): Promise<HotelAvailability[]> {
    return this.hotelAvailabilityService.findByHotelIdWithDates(hotelId);
  }

  @Put('/dates/:hotelId')
  @ApiOperation({ summary: 'Update hotel availabilities with date selections' })
  @ApiResponse({
    status: 200,
    description: 'Hotel availability records updated successfully.',
  })
  async updateByHotelIdWithDates(
    @Param('hotelId', ParseIntPipe) hotelId: number,
    @Body() updateDto: UpdateHotelAvailabilityListDto,
  ): Promise<HotelAvailability[]> {
    // ✅ Передаём DTO в сервис для обновления
    return this.hotelAvailabilityService.updateByHotelIdWithDates(
      hotelId,
      updateDto,
    );
  }

  @Delete('/date/:calendarId')
  @ApiOperation({ summary: 'Delete a specific date from availability' })
  @ApiResponse({
    status: 200,
    description: 'Date has been successfully deleted.',
  })
  async deleteDate(
    @Param('calendarId') calendarId: string,
  ): Promise<{ success: boolean; message: string }> {
    return this.hotelAvailabilityService.deleteDate(calendarId);
  }

  @Delete('/dates/batch')
  @ApiOperation({ summary: 'Delete multiple dates by calendarIds' })
  @ApiResponse({
    status: 200,
    description: 'Dates have been successfully deleted.',
  })
  async deleteDatesBatch(
    @Body() dto: { calendarIds: string[] },
  ): Promise<{ success: boolean; message: string; count: number }> {
    return this.hotelAvailabilityService.deleteDatesBatch(dto.calendarIds);
  }
}
