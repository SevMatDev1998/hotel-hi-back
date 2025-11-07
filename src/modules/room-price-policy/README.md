# Room Price Policy Module

## Описание

Модуль для управления ценовой политикой комнат отеля. Позволяет создавать комплексную ценовую политику, включающую:
- Цены на питание
- Цены на комнаты
- Дополнительные сервисы (прибытие/отъезд)
- Прочие сервисы

## API Endpoint

### POST `/api/price-policy/rooms`

Создание ценовой политики для комнаты отеля.

#### Request Body

```typescript
{
  "hotelAvailabilityId": number,
  "foodPrices": [
    {
      "hotelAvailabilityId": number,
      "hotelFoodId": number,
      "hotelAgeAssignmentId"?: number,  // обязателен если includedInPrice = false
      "price": number,
      "includedInPrice": boolean
    }
  ],
  "roomPrice": {
    "hotelRoomId": number,
    "hotelAvailabilityId": number,
    "price": number,
    "dateFrom": string,  // ISO формат "2025-01-01"
    "dateTo": string     // ISO формат "2025-12-31"
  },
  "arrivalDepartureServices": [
    {
      "hotelServiceId": number,
      "hotelAvailabilityId": number,
      "hotelRoomId"?: number,
      "isTimeLimited": boolean,
      "startTime"?: string,  // ISO DateTime "2025-11-07T21:35:00.000Z"
      "percentage"?: number, // 0-100
      "serviceName": string,
      "price"?: number,
      "notConstantValue"?: boolean
    }
  ],
  "otherServices": [
    {
      "hotelServiceId": number,
      "hotelAvailabilityId": number,
      "hotelRoomId"?: number,
      "price": number | null,
      "notConstantValue": boolean,
      "serviceName": string,
      "isTimeLimited": boolean
    }
  ]
}
```

#### Success Response (200 OK)

```json
{
  "success": true,
  "message": "Price policy created successfully",
  "data": {
    "hotelAvailabilityId": 1,
    "createdFoodPrices": 6,
    "createdRoomPrice": 1,
    "createdAdditionalServices": 4
  }
}
```

#### Error Response (400 Bad Request)

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "Hotel availability with id 1 not found",
    "Date from must be less than date to"
  ]
}
```

## Валидация

Модуль выполняет следующие проверки:
- ✅ Существование `hotelAvailabilityId` в таблице `HotelAvailability`
- ✅ Существование `hotelRoomId` в таблице `HotelRoom`
- ✅ Существование всех `hotelFoodId` в таблице `HotelFood`
- ✅ Существование всех `hotelServiceId` в таблице `HotelService`
- ✅ Существование всех `hotelAgeAssignmentId` в таблице `HotelAgeAssignment`
- ✅ `dateFrom` < `dateTo`
- ✅ `price` >= 0
- ✅ `percentage` между 0 и 100
- ✅ Для `includedInPrice = false` обязателен `hotelAgeAssignmentId`

## Транзакции

Все операции выполняются в одной транзакции. Если хотя бы одна операция не удалась, все изменения откатываются.

## Пример использования

```bash
curl -X POST http://localhost:3000/api/price-policy/rooms \
  -H "Content-Type: application/json" \
  -d '{
    "hotelAvailabilityId": 1,
    "foodPrices": [
      {
        "hotelAvailabilityId": 1,
        "hotelFoodId": 6,
        "price": 0,
        "includedInPrice": true
      }
    ],
    "roomPrice": {
      "hotelRoomId": 1,
      "hotelAvailabilityId": 1,
      "price": 50000,
      "dateFrom": "2025-01-01",
      "dateTo": "2025-12-31"
    },
    "arrivalDepartureServices": [
      {
        "hotelServiceId": 40,
        "hotelAvailabilityId": 1,
        "hotelRoomId": 1,
        "isTimeLimited": true,
        "startTime": "2025-11-07T21:35:00.000Z",
        "percentage": 44,
        "serviceName": "Arrival"
      }
    ],
    "otherServices": [
      {
        "hotelServiceId": 42,
        "hotelAvailabilityId": 1,
        "hotelRoomId": 1,
        "price": 2000,
        "notConstantValue": false,
        "serviceName": "Food delivery",
        "isTimeLimited": false
      }
    ]
  }'
```

## Структура модуля

```
room-price-policy/
├── dto/
│   ├── create-hotel-food-price.dto.ts
│   ├── create-hotel-room-price.dto.ts
│   ├── create-hotel-additional-service.dto.ts
│   ├── create-other-service.dto.ts
│   ├── create-room-price-policy.dto.ts
│   └── index.ts
├── room-price-policy.controller.ts
├── room-price-policy.service.ts
├── room-price-policy.module.ts
├── index.ts
└── README.md
```

## Связанные таблицы в БД

- `HotelFoodPrice` - цены на питание
- `HotelRoomPrice` - цены на комнаты
- `HotelAdditionalService` - дополнительные сервисы
- `HotelAvailability` - доступность отеля
- `HotelRoom` - комнаты отеля
- `HotelFood` - питание отеля
- `HotelService` - сервисы отеля
- `HotelAgeAssignment` - возрастные категории

## Логирование

Все операции логируются с помощью `Logger`:
- Создание политики цен
- Количество созданных записей
- Ошибки валидации и выполнения
