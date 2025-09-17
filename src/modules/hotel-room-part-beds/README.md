# Hotel Room Part Beds Module

This module manages bed configurations for hotel room parts. It allows you to assign different types and sizes of beds to specific parts of hotel rooms.

## Overview

The `HotelRoomPartBedsModule` provides functionality to:
- Create bed configurations for hotel room parts
- Retrieve bed configurations by hotel room part
- Delete bed configurations

## Database Relations

The module works with the `HotelRoomPartBeds` table which has the following relationships:
- **HotelRoomPart**: The room part this bed configuration belongs to
- **RoomBedSize**: The size of the bed (e.g., Twin, Double, Queen, King)
- **RoomBedType**: The type of bed (e.g., Standard, Sofa Bed, Bunk Bed)
- **BedType** (enum): Whether it's a Main, Cradle, or Additional bed

## API Endpoints

### POST /hotel-room-part-beds
Creates bed configurations for a hotel room part.

**Request Body:**
```json
{
  "hotelRoomPartId": 1,
  "bedConfigurations": [
    {
      "bedType": "Main",
      "roomBedSizeId": 1,
      "roomBedTypeId": 1,
      "quantity": 2
    },
    {
      "bedType": "Additional", 
      "roomBedSizeId": 2,
      "roomBedTypeId": 2,
      "quantity": 1
    }
  ]
}
```

### GET /hotel-room-part-beds/hotel-room-part/:hotelRoomPartId
Retrieves all bed configurations for a specific hotel room part.

### DELETE /hotel-room-part-beds/hotel-room-part/:hotelRoomPartId
Deletes all bed configurations for a specific hotel room part.

## Usage

### Frontend Integration
The frontend should send:
- `hotelRoomPartId`: The ID of the room part (e.g., bedroom, living room)
- `bedConfigurations`: Array of bed configurations with:
  - `bedType`: "Main", "Cradle", or "Additional"
  - `roomBedSizeId`: ID referencing the bed size
  - `roomBedTypeId`: ID referencing the bed type
  - `quantity`: Number of beds with this configuration

### Example Use Case
For a hotel suite with a bedroom that has:
- 1 King size bed (main bed)
- 1 Sofa bed (additional sleeping)

The request would be:
```json
{
  "hotelRoomPartId": 15,
  "bedConfigurations": [
    {
      "bedType": "Main",
      "roomBedSizeId": 4, // King size
      "roomBedTypeId": 1, // Standard bed
      "quantity": 1
    },
    {
      "bedType": "Additional",
      "roomBedSizeId": 3, // Queen size  
      "roomBedTypeId": 2, // Sofa bed
      "quantity": 1
    }
  ]
}
```

## Module Integration

To use this module in your application:

```typescript
import { HotelRoomPartBedsModule } from './modules/hotel-room-part-beds';

@Module({
  imports: [HotelRoomPartBedsModule],
})
export class AppModule {}
```
