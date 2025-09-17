# Room Bed Sizes Module

This module provides API endpoints for managing room bed sizes in the hotel management system.

## Features

- **GET /api/v1/room-bed-sizes** - Retrieve all room bed sizes

## Files Structure

```
room-bed-sizes/
├── dto/
│   └── room-bed-size.dto.ts      # Data transfer object
├── entities/
│   └── room-bed-size.entity.ts   # Entity definition
├── room-bed-sizes.controller.ts  # REST API controller
├── room-bed-sizes.service.ts     # Business logic service
├── room-bed-sizes.module.ts      # NestJS module
└── index.ts                      # Module exports
```

## API Documentation

### Get All Room Bed Sizes

**Endpoint:** `GET /api/v1/room-bed-sizes`

**Description:** Returns all available room bed sizes (in cm, e.g., 80, 90, 120, 140, 160, 180, 200)

**Response:**
```json
[
  {
    "id": 1,
    "size": "160",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "size": "180",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

## Database Schema

The module uses the `RoomBedSizes` table with the following structure:

```sql
CREATE TABLE "RoomBedSizes" (
  "id" SERIAL PRIMARY KEY,
  "size" VARCHAR(64) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW()
);
```

## Usage

Import the module in your application:

```typescript
import { RoomBedSizesModule } from './modules/room-bed-sizes';

@Module({
  imports: [RoomBedSizesModule],
})
export class AppModule {}
```
