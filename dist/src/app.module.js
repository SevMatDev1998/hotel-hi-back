"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./modules/auth/auth.module");
const user_module_1 = require("./modules/user/user.module");
const hotel_module_1 = require("./modules/hotel/hotel.module");
const countries_module_1 = require("./modules/countries/countries.module");
const room_views_module_1 = require("./modules/room-views/room-views.module");
const room_classes_module_1 = require("./modules/room-classes/room-classes.module");
const room_parts_module_1 = require("./modules/room-parts/room-parts.module");
const hotel_room_module_1 = require("./modules/hotel-room/hotel-room.module");
const hotel_room_parts_module_1 = require("./modules/hotel-room-parts/hotel-room-parts.module");
const room_bed_types_module_1 = require("./modules/room-bed-types/room-bed-types.module");
const room_bed_sizes_module_1 = require("./modules/room-bed-sizes/room-bed-sizes.module");
const configuration_1 = require("./config/configuration");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.databaseConfig, configuration_1.jwtConfig, configuration_1.appConfig, configuration_1.swaggerConfig],
            }),
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            hotel_module_1.HotelModule,
            countries_module_1.CountriesModule,
            room_views_module_1.RoomViewsModule,
            room_classes_module_1.RoomClassesModule,
            room_parts_module_1.RoomPartsModule,
            hotel_room_module_1.HotelRoomModule,
            hotel_room_parts_module_1.HotelRoomPartsModule,
            room_bed_types_module_1.RoomBedTypesModule,
            room_bed_sizes_module_1.RoomBedSizesModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map