import { IsInt, IsArray, ValidateNested, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { BedType } from '@prisma/client';

export class BedConfigurationItem {
  @ApiProperty({
    description: 'Type of bed (Main, Cradle, Additional)',
    example: 'Main',
    enum: BedType,
    enumName: 'BedType',
  })
  @IsEnum(BedType)
  bedType: BedType;

  @ApiProperty({
    description: 'ID of the room bed size',
    example: 1,
    type: Number,
  })
  @IsInt()
  roomBedSizeId: number;

  @ApiProperty({
    description: 'ID of the room bed type',
    example: 1,
    type: Number,
  })
  @IsInt()
  roomBedTypeId: number;

  // @ApiProperty({
  //   description: 'Quantity of beds with this configuration',
  //   example: 2,
  //   minimum: 1,
  //   type: Number,
  // })
  // @IsInt()
  // @Min(1)
  // quantity: number;
}

export class CreateHotelRoomPartBedsDto {
  @ApiProperty({
    description: 'ID of the hotel room part to assign beds to',
    example: 1,
    type: Number,
  })
  @IsInt()
  hotelRoomPartId: number;

  @ApiProperty({
    description: 'Array of bed configurations to create',
    type: [BedConfigurationItem],
    example: [
      {
        bedType: 'Main',
        roomBedSizeId: 1,
        roomBedTypeId: 1,
        // quantity: 2,
      },
      {
        bedType: 'Additional',
        roomBedSizeId: 2,
        roomBedTypeId: 2,
        // quantity: 1,
      },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BedConfigurationItem)
  bedConfigurations: BedConfigurationItem[];
}
