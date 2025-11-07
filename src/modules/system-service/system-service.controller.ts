import { Controller, Get, Param } from '@nestjs/common';
import { SystemServiceDto } from './dto';
import { SystemServiceService } from './system-service.service';

@Controller('system-services')
export class SystemServiceController {
  constructor(private readonly systemServiceService: SystemServiceService) { }

  @Get()
  async findAll(): Promise<SystemServiceDto[]> {
    return this.systemServiceService.findAll();
  }

  @Get('/types/:typeId')
  async findByTypeId(
    @Param('typeId') typeId: number,
  ): Promise<SystemServiceDto[]> {
    return this.systemServiceService.findByTypeId(typeId);
  }

  @Get('/additional-services')
  async findAdditionalService(): Promise<SystemServiceDto[]> {
    return this.systemServiceService.findAdditionalService();
  }
}
