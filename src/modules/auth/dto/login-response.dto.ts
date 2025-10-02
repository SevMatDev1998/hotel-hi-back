// auth/dto/login-response.dto.ts

import { User } from '@prisma/client';

export class LoginResponseDto {
  user: Partial<User> & {
    hotelId?: number;
    hotelName?: string;
  };
  accessToken: string;
  refreshToken: string;
}
