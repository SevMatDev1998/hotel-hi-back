# Инструкция по использованию Room Price Policy API

## 🚀 Быстрый старт

### 1. Запуск сервера

```bash
npm run start:dev
```

Сервер запустится на `http://localhost:3000`

### 2. Endpoint

```
POST http://localhost:3000/price-policy/rooms
Content-Type: application/json
```

### 3. Пример запроса с помощью curl

```bash
curl -X POST http://localhost:3000/price-policy/rooms \
  -H "Content-Type: application/json" \
  -d @src/modules/room-price-policy/example-request.json
```

### 4. Пример запроса с помощью Postman/Insomnia

1. Метод: `POST`
2. URL: `http://localhost:3000/price-policy/rooms`
3. Headers:
   - `Content-Type: application/json`
4. Body (raw JSON): скопируйте содержимое `example-request.json`

## 📋 Структура запроса

### Обязательные поля

- `hotelAvailabilityId` - ID доступности отеля
- `roomPrice` - объект с ценой комнаты
  - `hotelRoomId` - ID комнаты
  - `price` - цена
  - `dateFrom` - дата начала (формат: "YYYY-MM-DD")
  - `dateTo` - дата окончания (формат: "YYYY-MM-DD")
- `foodPrices` - массив цен на питание
- `arrivalDepartureServices` - массив сервисов прибытия/отъезда
- `otherServices` - массив других сервисов

### Важные правила

#### Для foodPrices:
- Если `includedInPrice = true`, то `hotelAgeAssignmentId` НЕ указывается (будет null)
- Если `includedInPrice = false`, то `hotelAgeAssignmentId` ОБЯЗАТЕЛЕН

#### Для arrivalDepartureServices:
- `isTimeLimited = true`
- `startTime` - обязателен (формат ISO: "2025-11-07T21:35:00.000Z")
- `percentage` - обязателен (0-100)
- `price` - опционально

#### Для otherServices:
- `isTimeLimited = false`
- `price` - может быть null или число
- `notConstantValue` - boolean, указывает переменная ли цена

## ✅ Успешный ответ

```json
{
  "success": true,
  "message": "Price policy created successfully",
  "data": {
    "hotelAvailabilityId": 1,
    "createdFoodPrices": 2,
    "createdRoomPrice": 1,
    "createdAdditionalServices": 4
  }
}
```

## ❌ Ошибки валидации

```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "Hotel availability with id 999 not found",
    "Date from must be less than date to"
  ]
}
```

## 🔍 Swagger Documentation

После запуска сервера, Swagger документация доступна по адресу:

```
http://localhost:3000/api
```

Там вы найдете:
- Интерактивную документацию API
- Возможность тестировать запросы прямо из браузера
- Примеры request/response

## 🧪 Тестирование

### Проверка перед созданием политики цен

Убедитесь что в базе данных существуют:

1. `HotelAvailability` с нужным ID
2. `HotelRoom` с нужным ID
3. Все `HotelFood` указанные в `foodPrices`
4. Все `HotelService` указанные в `arrivalDepartureServices` и `otherServices`
5. Все `HotelAgeAssignment` указанные в `foodPrices` (где `includedInPrice = false`)

### Запросы для проверки данных

```bash
# Проверить availability
curl http://localhost:3000/hotel-availability/1

# Проверить комнату
curl http://localhost:3000/hotel-rooms/room/1

# Проверить еду отеля
curl http://localhost:3000/hotel-food/hotel/1

# Проверить сервисы отеля
curl http://localhost:3000/hotel-services/hotel/1
```

## 📊 Что сохраняется в БД

При успешном запросе создаются записи в следующих таблицах:

1. **HotelFoodPrice** - цены на питание
   - Для каждого элемента из массива `foodPrices`

2. **HotelRoomPrice** - цена комнаты
   - Одна запись из объекта `roomPrice`

3. **HotelAdditionalService** - дополнительные сервисы
   - Для каждого элемента из `arrivalDepartureServices`
   - Для каждого элемента из `otherServices`

## 🔄 Транзакции

Все операции выполняются в **одной транзакции**:
- Если хотя бы одна операция не удалась - **ВСЕ** изменения откатываются
- База данных остается в консистентном состоянии

## 📝 Логи

При создании ценовой политики в консоль выводятся логи:

```
[RoomPricePolicyService] Creating price policy for hotel availability ID: 1
[RoomPricePolicyService] Created 2 food price records
[RoomPricePolicyService] Created room price record for room ID: 1
[RoomPricePolicyService] Created 2 arrival/departure service records
[RoomPricePolicyService] Created 2 other service records
[RoomPricePolicyService] Successfully created price policy for availability ID: 1
```

В случае ошибки:

```
[RoomPricePolicyService] Failed to create price policy: Hotel availability with id 999 not found
```

## 🛠️ Troubleshooting

### Ошибка: "Hotel availability with id X not found"
**Решение:** Создайте `HotelAvailability` с нужным ID или используйте существующий

### Ошибка: "Date from must be less than date to"
**Решение:** Проверьте что `dateFrom` < `dateTo` в объекте `roomPrice`

### Ошибка: "Percentage must be between 0 and 100"
**Решение:** Убедитесь что `percentage` в `arrivalDepartureServices` находится в диапазоне 0-100

### Ошибка: "Hotel age assignment ID is required for food prices not included in price"
**Решение:** Для всех `foodPrices` с `includedInPrice = false` укажите `hotelAgeAssignmentId`

## 💡 Полезные команды

```bash
# Запустить в режиме разработки
npm run start:dev

# Собрать проект
npm run build

# Запустить Prisma Studio (GUI для БД)
npm run db:studio

# Применить миграции
npm run db:migrate

# Пересоздать БД и заполнить seed данными
npm run db:reset
```
