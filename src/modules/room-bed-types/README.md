# Room Bed Types Module

This module provides API endpoints for managing room bed types in the hotel management system.

## Features

- **GET /api/v1/room-bed-types** - Retrieve all room bed types

## Files Structure

```
room-bed-types/
├── dto/
│   └── room-bed-type.dto.ts      # Data transfer object
├── entities/
│   └── room-bed-type.entity.ts   # Entity definition
├── room-bed-types.controller.ts  # REST API controller
├── room-bed-types.service.ts     # Business logic service
├── room-bed-types.module.ts      # NestJS module
└── index.ts                      # Module exports
```

## API Documentation

### Get All Room Bed Types

**Endpoint:** `GET /api/v1/room-bed-types`

**Description:** Returns all available room bed types (e.g., Single, Double, Queen, King, etc.)

**Response:**
```json
[
  {
    "id": 1,
    "name": "Queen",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "name": "King",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

## Database Schema

The module uses the `RoomBedTypes` table with the following structure:

```sql
CREATE TABLE "RoomBedTypes" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(128) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);
```

## Usage

Import the module in your application:

```typescript
import { RoomBedTypesModule } from './modules/room-bed-types';

@Module({
  imports: [RoomBedTypesModule],
})
export class AppModule {}
```
