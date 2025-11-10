import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class HotelAvailabilityDateDto {
  @ApiProperty({
    description: 'ID месяца и дня (например, m1-d5)',
    example: 'm1-d5',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Дата в формате ISO',
    example: '2025-01-05T00:00:00.000Z',
  })
  @IsDateString()
  date: string;

  @IsString()
  calendarId: string;

  // 💰 Комиссии
  @ApiProperty({ example: 100.0, required: false })
  @IsOptional()
  @IsNumber()
  roomFee?: number;

  @ApiProperty({ example: 50.0, required: false })
  @IsOptional()
  @IsNumber()
  foodFee?: number;

  @ApiProperty({ example: 20.0, required: false })
  @IsOptional()
  @IsNumber()
  additionalFee?: number;

  @ApiProperty({ example: 30.0, required: false })
  @IsOptional()
  @IsNumber()
  serviceFee?: number;
}
export class UpdateHotelAvailabilityWithDatesDto {
  @ApiProperty({
    description: 'Уникальный идентификатор availability',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'ID отеля',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  hotelId: number;

  @ApiProperty({
    description: 'Название availability (сезон, период и т.д.)',
    example: 'Summer Season',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Цвет для отображения на календаре',
    example: 'red',
  })
  @IsString()
  @IsNotEmpty()
  color: string;

  @ApiProperty({
    description: 'Дата начала действия availability',
    example: '2025-01-01T00:00:00.000Z',
  })
  @IsDateString()
  @IsNotEmpty()
  checkInTime: string;

  @ApiProperty({
    description: 'Дата окончания действия availability',
    example: '2025-12-31T23:59:59.999Z',
  })
  @IsDateString()
  @IsNotEmpty()
  checkoutTime: string;

  @ApiProperty({
    description: 'Подтверждено ли availability администратором',
    example: false,
  })
  @IsBoolean()
  confirmed: boolean;

  @ApiProperty({
    description: 'Массив дат, относящихся к этому availability',
    type: [HotelAvailabilityDateDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => HotelAvailabilityDateDto)
  hotelAvailabilityDateCommissions: HotelAvailabilityDateDto[];

  @ApiProperty({
    description: 'Дата создания записи',
    example: '2025-10-21T12:57:27.408Z',
  })
  @IsOptional()
  @IsDateString()
  createdAt?: string;

  @ApiProperty({
    description: 'Дата последнего обновления',
    example: '2025-10-21T12:57:27.408Z',
  })
  @IsOptional()
  @IsDateString()
  updatedAt?: string;
}

export class CommissionDateDto {

  // 💰 Комиссии отеля
  @ApiProperty({ example: 100.0, required: false, description: 'Стоимость комнаты' })
  @IsOptional()
  @IsNumber()
  roomFee?: number;

  @ApiProperty({ example: 50.0, required: false, description: 'Плата за еду' })
  @IsOptional()
  @IsNumber()
  foodFee?: number;

  @ApiProperty({ example: 20.0, required: false, description: 'Дополнительная плата' })
  @IsOptional()
  @IsNumber()
  additionalFee?: number;

  @ApiProperty({ example: 30.0, required: false, description: 'Сервисный сбор' })
  @IsOptional()
  @IsNumber()
  serviceFee?: number;

}
export class UpdateHotelAvailabilityListDto {
  @ApiProperty({
    description: 'Availability с датами (ОДИН объект, не массив)',
    type: UpdateHotelAvailabilityWithDatesDto,
  })
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UpdateHotelAvailabilityWithDatesDto)
  availability: UpdateHotelAvailabilityWithDatesDto;  // ← ИЗМЕНЕНО с availabilities[] на availability

  @ApiProperty({
    description: 'Комиссии, применяемые к выбранным датам',
    type: () => CommissionDateDto,
    required: false,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => CommissionDateDto)
  commissionDate?: CommissionDateDto;
}