"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = exports.appConfig = exports.jwtConfig = exports.databaseConfig = void 0;
const config_1 = require("@nestjs/config");
exports.databaseConfig = (0, config_1.registerAs)('database', () => ({
    url: process.env.DATABASE_URL,
}));
exports.jwtConfig = (0, config_1.registerAs)('jwt', () => ({
    access: {
        secret: process.env.JWT_ACCESS_SECRET || 'fallback-access-secret',
        expiresIn: process.env.JWT_ACCESS_EXPIRATION || '15m',
    },
    refresh: {
        secret: process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret',
        expiresIn: process.env.JWT_REFRESH_EXPIRATION || '30d',
    },
}));
exports.appConfig = (0, config_1.registerAs)('app', () => ({
    port: parseInt(process.env.PORT || '3000', 10),
    environment: process.env.NODE_ENV || 'development',
}));
exports.swaggerConfig = (0, config_1.registerAs)('swagger', () => ({
    title: process.env.SWAGGER_TITLE || 'Hotel Hivi API',
    description: process.env.SWAGGER_DESCRIPTION ||
        'Hotel Management System API Documentation',
    version: process.env.SWAGGER_VERSION || '1.0',
}));
//# sourceMappingURL=configuration.js.map