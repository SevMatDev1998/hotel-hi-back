import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateRoomPricePolicyDto } from './dto';
import { RoomPricePolicyService } from './room-price-policy.service';

@ApiTags('Room Price Policy')
@Controller('price-policy/rooms')
export class RoomPricePolicyController {
  constructor(
    private readonly roomPricePolicyService: RoomPricePolicyService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
  @ApiOperation({
    summary: 'Create room price policy',
    description:
      'Creates a complete price policy for a hotel room including food prices, room prices, and additional services',
  })
  @ApiResponse({
    status: 200,
    description: 'Price policy created successfully',
    schema: {
      example: {
        success: true,
        message: 'Price policy created successfully',
        data: {
          hotelAvailabilityId: 1,
          createdFoodPrices: 6,
          createdRoomPrice: 1,
          createdAdditionalServices: 4,
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error or bad request',
    schema: {
      example: {
        success: false,
        message: 'Validation error',
        errors: [
          'Hotel availability with id 1 not found',
          'Date from must be less than date to',
        ],
      },
    },
  })
  async createRoomPricePolicy(@Body() dto: CreateRoomPricePolicyDto) {
    return this.roomPricePolicyService.createRoomPricePolicy(dto);
  }
  ////////////////////////////////////////////////////////////////////

  @Get(':hotelAvailabilityId/:roomId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get room price policy',
    description:
      'Retrieves the complete price policy for a hotel room including food prices, room prices, and additional services',
  })
  @ApiResponse({
    status: 200,
    description: 'Price policy retrieved successfully',
    schema: {
      example: {
        success: true,
        data: {
          hotelAvailabilityId: 1,
          hotelRoomId: 1,
          foodPrices: [
            {
              id: 1,
              hotelAvailabilityId: 1,
              hotelFoodId: 6,
              hotelAgeAssignmentId: null,
              price: 0,
              includedInPrice: true,
              createdAt: '2025-11-07T10:00:00Z',
              updatedAt: '2025-11-07T10:00:00Z',
            },
          ],
          roomPrice: {
            id: 1,
            hotelRoomId: 1,
            hotelAvailabilityId: 1,
            price: 50000,
            createdAt: '2025-11-07T10:00:00Z',
            updatedAt: '2025-11-07T10:00:00Z',
          },
          arrivalDepartureServices: [],
          otherServices: [],
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    schema: {
      example: {
        success: false,
        message: 'Hotel availability with id 1 not found',
      },
    },
  })
  async getRoomPricePolicy(
    @Param('hotelAvailabilityId', ParseIntPipe) hotelAvailabilityId: number,
    @Param('roomId', ParseIntPipe) roomId: number,
  ) {
    return this.roomPricePolicyService.getRoomPricePolicy(
      hotelAvailabilityId,
      roomId,
    );
  }
}
