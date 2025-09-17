# Hotel Room Parts Module

This module handles the management of hotel room parts - the individual components that make up a hotel room (like beds, bathrooms, balconies, etc.).

## Features

- Create multiple room parts for a hotel room with quantities
- Each quantity creates individual records in the database
- Retrieve room parts by hotel room ID
- Delete individual room part records

## API Endpoints

### POST /hotel-room-parts
Creates room parts for a hotel room based on the provided data.

**Request Body:**
```json
{
  "hotelRoomId": 1,
  "roomParts": [
    {
      "roomPartId": 1,
      "quantity": 2
    },
    {
      "roomPartId": 3,
      "quantity": 1
    }
  ]
}
```

This will create 3 individual records in the database:
- 2 records for roomPartId 1
- 1 record for roomPartId 3

### GET /hotel-room-parts/hotel-room/:hotelRoomId
Retrieves all room parts for a specific hotel room.

### DELETE /hotel-room-parts/:id
Deletes a specific room part record by ID.

## Database Structure

The module works with the `HotelRoomPart` table which connects:
- `hotelRoomId` - Reference to the hotel room
- `roomPartId` - Reference to the room part type
- Individual records for each room part instance
