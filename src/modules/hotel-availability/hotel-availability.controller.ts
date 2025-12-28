import {
  Controller,
  Post,
  Body,
  ParseIntPipe,
  Param,
  Get,
  Put,
  Delete,
  StreamableFile,
  Header,
} from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HotelAvailabilityService } from './hotel-availability.service';
import { CreateHotelAvailabilityDto } from './dto/create-hotel-availability.dto';
import { UpdateHotelAvailabilityDto } from './dto/update-hotel-availability.dto';
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

  @Put('/:availabilityId')
  @ApiOperation({ summary: 'Update hotel availability' })
  @ApiResponse({
    status: 200,
    description: 'Hotel availability has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async update(
    @Param('availabilityId', ParseIntPipe) availabilityId: number,
    @Body() updateHotelAvailabilityDto: UpdateHotelAvailabilityDto,
  ): Promise<HotelAvailability> {
    return this.hotelAvailabilityService.update(
      availabilityId,
      updateHotelAvailabilityDto,
    );
  }
  @Public()
  @Get('/pdf/:availabilityId')
  @Header('Content-Type', 'application/pdf')
  @ApiOperation({ summary: 'Generate and download PDF for hotel availability' })
  @ApiResponse({
    status: 200,
    description: 'PDF generated successfully.',
    content: {
      'application/pdf': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Availability not found.' })
  async generatePdf(
    @Param('availabilityId', ParseIntPipe) availabilityId: number,
  ): Promise<StreamableFile> {
    const pdfBuffer =
      await this.hotelAvailabilityService.generateAvailabilityPdf(
        availabilityId,
      );

    return new StreamableFile(pdfBuffer, {
      type: 'application/pdf',
      disposition: `inline; filename="availability-${availabilityId}.pdf"`,
    });
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

  @Get('/detail/:availabilityId')
  @ApiOperation({
    summary:
      'Get hotel availability detail by availability ID with all related data',
  })
  @ApiResponse({
    status: 200,
    description: 'Hotel availability detail retrieved successfully.',
  })
  findDetailById(
    @Param('availabilityId', ParseIntPipe) availabilityId: number,
  ) {
    return this.hotelAvailabilityService.findDetailById(availabilityId);
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

  @Post('/copy/:availabilityId')
  @ApiOperation({ summary: 'Copy hotel availability with all related data' })
  @ApiResponse({
    status: 201,
    description: 'Hotel availability has been successfully copied.',
  })
  @ApiResponse({ status: 404, description: 'Availability not found.' })
  async copyAvailability(
    @Param('availabilityId', ParseIntPipe) availabilityId: number,
  ): Promise<HotelAvailability> {
    return this.hotelAvailabilityService.copyAvailability(availabilityId);
  }
}
