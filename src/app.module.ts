import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { HotelModule } from './modules/hotel/hotel.module';
import { CountriesModule } from './modules/countries/countries.module';
import { RoomViewsModule } from './modules/room-views/room-views.module';
import { RoomClassesModule } from './modules/room-classes/room-classes.module';
import { RoomPartsModule } from './modules/room-parts/room-parts.module';
import { HotelRoomModule } from './modules/hotel-room/hotel-room.module';
import { HotelRoomPartsModule } from './modules/hotel-room-parts/hotel-room-parts.module';
import { RoomBedTypesModule } from './modules/room-bed-types/room-bed-types.module';
import { RoomBedSizesModule } from './modules/room-bed-sizes/room-bed-sizes.module';
import {
  databaseConfig,
  jwtConfig,
  appConfig,
  swaggerConfig,
} from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, appConfig, swaggerConfig],
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    HotelModule,
    CountriesModule,
    RoomViewsModule,
    RoomClassesModule,
    RoomPartsModule,
    HotelRoomModule,
    HotelRoomPartsModule,
    RoomBedTypesModule,
    RoomBedSizesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
