# HotelRoom Module

This module provides functionality for creating hotel rooms.

## Endpoints

### POST /hotel-rooms

Creates a new hotel room.

#### Request Body

```json
{
  "name": "Deluxe Room",
  "hotelId": 1,
  "roomClassId": 1,
  "roomViewId": 1, // optional
  "numbers": "101, 102, 103",
  "area": "25 sq.m",
  "mainGuestQuantity": 2,
  "additionalGuestQuantity": 1,
  "status": "Active", // Active | Incomplete | Inactive | Deleted
  "roomNumberQuantity": 3,
  "completeness": "Completed" // Draft | Completed
}
```

#### Response

```json
{
  "id": 1,
  "name": "Deluxe Room",
  "hotelId": 1,
  "roomClassId": 1,
  "roomViewId": 1,
  "numbers": "101, 102, 103",
  "area": "25 sq.m",
  "mainGuestQuantity": 2,
  "additionalGuestQuantity": 1,
  "status": "Active",
  "roomNumberQuantity": 3,
  "completeness": "Completed",
  "createdAt": "2025-09-17T12:00:00.000Z",
  "updatedAt": "2025-09-17T12:00:00.000Z",
  "deletedAt": null,
  "hotel": {
    // Hotel details
  },
  "roomClass": {
    // Room class details
  },
  "roomView": {
    // Room view details (if provided)
  }
}
```

#### Validation

- `name`: Required string
- `hotelId`: Required integer (must exist in database)
- `roomClassId`: Required integer (must exist in database)
- `roomViewId`: Optional integer (must exist in database if provided)
- `numbers`: Required string
- `area`: Required string
- `mainGuestQuantity`: Required integer, minimum 1
- `additionalGuestQuantity`: Required integer, minimum 0
- `status`: Required enum value (Active, Incomplete, Inactive, Deleted)
- `roomNumberQuantity`: Required integer, minimum 1
- `completeness`: Required enum value (Draft, Completed)

#### Error Responses

- `400 Bad Request`: Validation errors or invalid data
- `404 Not Found`: Referenced hotel, room class, or room view not found
