import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CuisinesService } from './cuisines.service';
import { CuisineDto } from './dto';

@ApiTags('cuisines')
@Controller('cuisines')
export class CuisinesController {
  constructor(private readonly cuisinesService: CuisinesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all cuisines',
    description: 'Retrieve a list of all available cuisines',
  })
  @ApiResponse({
    status: 200,
    description: 'List of cuisines retrieved successfully',
    type: [CuisineDto],
  })
  async findAll(): Promise<CuisineDto[]> {
    return this.cuisinesService.findAll();
  }
}
