import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoomClassesService } from './room-classes.service';
import { RoomClassDto } from './dto/room-class.dto';

@ApiTags('Room Classes')
@Controller('room-classes')
export class RoomClassesController {
  constructor(private readonly roomClassesService: RoomClassesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all room classes' })
  @ApiResponse({
    status: 200,
    description: 'Returns all room classes',
    type: [RoomClassDto],
  })
  async findAll(): Promise<RoomClassDto[]> {
    return this.roomClassesService.findAll();
  }
}
