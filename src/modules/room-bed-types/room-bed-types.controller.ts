import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RoomBedTypesService } from './room-bed-types.service';
import { RoomBedTypeDto } from './dto/room-bed-type.dto';

@ApiTags('Room Bed Types')
@Controller('room-bed-types')
export class RoomBedTypesController {
  constructor(private readonly roomBedTypesService: RoomBedTypesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all room bed types' })
  @ApiResponse({
    status: 200,
    description: 'Returns all room bed types',
    type: [RoomBedTypeDto],
  })
  async findAll(): Promise<RoomBedTypeDto[]> {
    return this.roomBedTypesService.findAll();
  }
}
