# Example JSON Request

Based on the UI screenshot showing a room configuration with different bed types, here's an example of the JSON structure the frontend should send:

## Example Request for Room Part Bed Configuration

```json
{
  "hotelRoomPartId": 1,
  "bedConfigurations": [
    {
      "bedType": "Main",
      "roomBedSizeId": 1,
      "roomBedTypeId": 1,
      "quantity": 1
    },
    {
      "bedType": "Main", 
      "roomBedSizeId": 2,
      "roomBedTypeId": 1,
      "quantity": 1
    },
    {
      "bedType": "Additional",
      "roomBedSizeId": 3,
      "roomBedTypeId": 2,
      "quantity": 2
    }
  ]
}
```

## Field Explanations

- **hotelRoomPartId**: The ID of the specific room part (bedroom, living room, etc.)
- **bedType**: Enum value - "Main", "Cradle", or "Additional"
- **roomBedSizeId**: References a record in RoomBedSizes table (Twin=1, Double=2, Queen=3, King=4, etc.)
- **roomBedTypeId**: References a record in RoomBedTypes table (Standard=1, Sofa Bed=2, Bunk Bed=3, etc.)
- **quantity**: Number of beds with this exact configuration

## Frontend Integration Notes

1. **Get Available Options**: Before showing the bed configuration UI, fetch:
   - Available bed sizes: `GET /room-bed-sizes`
   - Available bed types: `GET /room-bed-types`

2. **Submit Configuration**: Send the bed configuration:
   - `POST /hotel-room-part-beds` with the JSON structure above

3. **View Existing Configuration**: To see current beds for a room part:
   - `GET /hotel-room-part-beds/hotel-room-part/{hotelRoomPartId}`

4. **Update Configuration**: To change beds (deletes existing and creates new):
   - `POST /hotel-room-part-beds` (this replaces all existing beds for that room part)

## Error Handling

The API will return:
- **400 Bad Request**: Invalid data format or validation errors
- **404 Not Found**: Hotel room part, bed size, or bed type doesn't exist
- **201 Created**: Success with created bed configurations

## Example Success Response

```json
[
  {
    "id": 1,
    "hotelRoomPartId": 1,
    "bedType": "Main",
    "roomBedSizeId": 1,
    "roomBedTypeId": 1,
    "quantity": 1,
    "createdAt": "2023-09-17T10:00:00.000Z",
    "updatedAt": "2023-09-17T10:00:00.000Z"
  },
  {
    "id": 2,
    "hotelRoomPartId": 1,
    "bedType": "Additional",
    "roomBedSizeId": 3,
    "roomBedTypeId": 2,
    "quantity": 2,
    "createdAt": "2023-09-17T10:00:00.000Z",
    "updatedAt": "2023-09-17T10:00:00.000Z"
  }
]
```
