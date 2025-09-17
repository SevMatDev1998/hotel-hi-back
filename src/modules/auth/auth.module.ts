import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { HotelModule } from '../hotel/hotel.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [UserModule, HotelModule, PrismaModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
