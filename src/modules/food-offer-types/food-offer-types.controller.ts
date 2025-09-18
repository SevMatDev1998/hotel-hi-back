import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { FoodOfferTypesService } from './food-offer-types.service';
import { FoodOfferTypeDto } from './dto';

@ApiTags('food-offer-types')
@Controller('food-offer-types')
export class FoodOfferTypesController {
  constructor(private readonly foodOfferTypesService: FoodOfferTypesService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all food offer types',
    description: 'Retrieve a list of all available food offer types',
  })
  @ApiResponse({
    status: 200,
    description: 'List of food offer types retrieved successfully',
    type: [FoodOfferTypeDto],
  })
  async findAll(): Promise<FoodOfferTypeDto[]> {
    return this.foodOfferTypesService.findAll();
  }
}
