import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class SetNewPasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
