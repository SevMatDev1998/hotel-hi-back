# Hotel Management System - Module Structure

## Created Modules

### 1. User Module (`/src/modules/user/`)
- **Entity**: `user.entity.ts` - User model based on Prisma schema
- **Service**: `user.service.ts` - User business logic (create, findByEmail, findById)
- **Controller**: `user.controller.ts` - Basic controller structure (endpoints to be added later)
- **Module**: `user.module.ts` - User module configuration

### 2. Hotel Module (`/src/modules/hotel/`)
- **Entity**: `hotel.entity.ts` - Hotel model based on Prisma schema
- **Service**: `hotel.service.ts` - Hotel business logic (create, findById, findByUserId)
- **Controller**: `hotel.controller.ts` - Basic controller structure (endpoints to be added later)
- **Module**: `hotel.module.ts` - Hotel module configuration

### 3. Auth Module (`/src/modules/auth/`)
- **DTOs**: 
  - `register.dto.ts` - Registration request validation
  - `auth-response.dto.ts` - Registration response structure
- **Service**: `auth.service.ts` - Authentication logic with registration functionality
- **Controller**: `auth.controller.ts` - Auth endpoints with Swagger documentation
- **Module**: `auth.module.ts` - Auth module configuration

## Registration API

### Endpoint: `POST /auth/register`

**Request Body:**
```json
{
  "hotelName": "Grand Hotel Example",
  "email": "owner@grandhotel.com",
  "password": "SecurePassword123",
}
```

**Response:**
```json
{
  "id": 1,
  "email": "owner@grandhotel.com",
  "hotelId": 1,
  "hotelName": "Grand Hotel Example",
  "message": "Registration successful"
}
```

## Features Implemented

1. **Single API Registration**: Creates both User and Hotel with one API call
2. **Password Validation**: Ensures password and password confirmation match
3. **Email Uniqueness**: Prevents duplicate users with same email
4. **Database Transaction**: Ensures both User and Hotel are created successfully or both fail
5. **Swagger Documentation**: API endpoints are documented for easy testing
6. **Validation**: Input validation using class-validator decorators
7. **Error Handling**: Proper error responses for various scenarios

## Next Steps

- Add authentication (login) functionality
- Add JWT token generation and validation
- Add more user management endpoints
- Add more hotel management endpoints
- Add role-based access control
- Add email verification functionality
