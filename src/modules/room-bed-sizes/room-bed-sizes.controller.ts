import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoomBedSizesService } from './room-bed-sizes.service';
import { RoomBedSizeDto } from './dto/room-bed-size.dto';

@ApiTags('Room Bed Sizes')
@Controller('room-bed-sizes')
export class RoomBedSizesController {
  constructor(private readonly roomBedSizesService: RoomBedSizesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all room bed sizes' })
  @ApiResponse({
    status: 200,
    description: 'Returns all room bed sizes',
    type: [RoomBedSizeDto],
  })
  async findAll(): Promise<RoomBedSizeDto[]> {
    return this.roomBedSizesService.findAll();
  }
}
