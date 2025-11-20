import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max } from 'class-validator';

export class UpdateNavigationStepDto {
  @ApiProperty({
    description: 'Navigation step number',
    example: 2,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @Max(10)
  stepNumber: number;
}
