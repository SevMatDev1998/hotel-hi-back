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
import { HotelRoomPartBedsModule } from './modules/hotel-room-part-beds/hotel-room-part-beds.module';
import { RoomBedTypesModule } from './modules/room-bed-types/room-bed-types.module';
import { RoomBedSizesModule } from './modules/room-bed-sizes/room-bed-sizes.module';
import { FoodOfferTypesModule } from './modules/food-offer-types/food-offer-types.module';
import { CuisinesModule } from './modules/cuisines/cuisines.module';
import { SystemServiceModule } from './modules/system-service/system-service.module';
import { SystemServiceTypeModule } from './modules/system-service-type/system-service-type.module';
import { SystemServiceGroupModule } from './modules/system-service-group/system-service-group.module';
import { HotelServiceModule } from './modules/hotel-service/hotel-service.module';
import { HotelServiceAvailabilityModule } from './modules/hotel-service-availability/hotel-service-availability.module';
import { HotelAvailabilityModule } from './modules/hotel-availability/hotel-availability.module';
import {
  databaseConfig,
  jwtConfig,
  appConfig,
  swaggerConfig,
} from './config/configuration';
import { CurrencyModule } from './modules/currency/currency.module';
import { HotelFoodModule } from './modules/hotel-food/hotel-food.module';
import { PartnersModule } from './modules/partners/partners.module';
import { HotelPartnerModule } from './modules/hotel-partner/hotel-partner.module';
import { HotelFoodPriceModule } from './modules/hotel-food-price/hotel-food-price.module';
import { HotelAgeAssignmentModule } from './modules/hotel-age-assignment/hotel-age-assignment.module';
import { HotelAvailabilityDateCommissionModule } from './modules/hotel-availability-date-commission/hotel-availability-date-commission.module';
import { NotificationsModule } from './modules/notifications/notificatons.module';
import { RoomPricePolicyModule } from './modules/room-price-policy/room-price-policy.module';
import { HotelRoomPriceModule } from './modules/hotel-room-price/hotel-room-price.module';
import { HotelAdditionalServiceModule } from './modules/hotel-additional-service/hotel-additional-service.module';

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
    HotelFoodModule,
    HotelRoomPartsModule,
    HotelRoomPartBedsModule,
    RoomBedTypesModule,
    RoomBedSizesModule,
    FoodOfferTypesModule,
    CuisinesModule,
    SystemServiceModule,
    SystemServiceTypeModule,
    SystemServiceGroupModule,
    HotelServiceModule,
    HotelServiceAvailabilityModule,
    HotelAvailabilityModule,
    HotelAvailabilityDateCommissionModule,
    CurrencyModule,
    PartnersModule,
    HotelPartnerModule,
    HotelFoodPriceModule,
    HotelAgeAssignmentModule,
    NotificationsModule,
    RoomPricePolicyModule,
    HotelRoomPriceModule,
    HotelAdditionalServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
