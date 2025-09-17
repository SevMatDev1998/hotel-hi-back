import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoomViewsService } from './room-views.service';
import { RoomViewDto } from './dto/room-view.dto';

@ApiTags('Room Views')
@Controller('room-views')
export class RoomViewsController {
  constructor(private readonly roomViewsService: RoomViewsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all room views' })
  @ApiResponse({
    status: 200,
    description: 'Returns all room views',
    type: [RoomViewDto],
  })
  async findAll(): Promise<RoomViewDto[]> {
    return this.roomViewsService.findAll();
  }
}
