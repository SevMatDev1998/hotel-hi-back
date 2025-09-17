import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoomPartsService } from './room-parts.service';
import { RoomPartDto } from './dto/room-part.dto';

@ApiTags('Room Parts')
@Controller('room-parts')
export class RoomPartsController {
  constructor(private readonly roomPartsService: RoomPartsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all room parts' })
  @ApiResponse({
    status: 200,
    description: 'Returns all room parts',
    type: [RoomPartDto],
  })
  async findAll(): Promise<RoomPartDto[]> {
    return this.roomPartsService.findAll();
  }
}
