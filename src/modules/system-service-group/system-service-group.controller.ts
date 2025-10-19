import { Controller, Get } from '@nestjs/common';
import { SystemServiceGroupService } from './system-service-group.service';
import { SystemServiceGroupDto } from './dto/system-service-group.dto';

@Controller('system-service-groups')
export class SystemServiceGroupController {
  constructor(
    private readonly systemServiceGroupService: SystemServiceGroupService,
  ) {}

  @Get()
  async findAll(): Promise<SystemServiceGroupDto[]> {
    return this.systemServiceGroupService.findAll();
  }
}
