import { Controller, Get, Param } from '@nestjs/common';
import { SystemServiceTypeService } from './system-service-type.service';
import { SystemServiceTypeDto } from './dto';

@Controller('system-service-types')
export class SystemServiceTypeController {
  constructor(
    private readonly systemServiceTypeService: SystemServiceTypeService,
  ) {}

  // @Get()
  // async findAll(): Promise<SystemServiceTypeDto[]> {
  //   return this.systemServiceTypeService.findAll();
  // }

  @Get('/groups/:groupId')
  async findByGroupId(
    @Param('groupId') groupId: number,
  ): Promise<SystemServiceTypeDto[]> {
    return this.systemServiceTypeService.findByGroupId(groupId);
  }
}
