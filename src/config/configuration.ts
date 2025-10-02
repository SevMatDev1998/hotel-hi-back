import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  url: process.env.DATABASE_URL,
}));

export const jwtConfig = registerAs('jwt', () => ({
  access: {
    secret: process.env.JWT_ACCESS_SECRET || 'fallback-access-secret',
    expiresIn: process.env.JWT_ACCESS_EXPIRATION || '15m',
  },
  refresh: {
    secret: process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret',
    expiresIn: process.env.JWT_REFRESH_EXPIRATION || '30d',
  },
}));

export const appConfig = registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  environment: process.env.NODE_ENV || 'development',
}));

export const swaggerConfig = registerAs('swagger', () => ({
  title: process.env.SWAGGER_TITLE || 'Hotel Hivi API',
  description:
    process.env.SWAGGER_DESCRIPTION ||
    'Hotel Management System API Documentation',
  version: process.env.SWAGGER_VERSION || '1.0',
}));
