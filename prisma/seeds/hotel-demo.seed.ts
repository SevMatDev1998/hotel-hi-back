import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedHotelDemo() {
  console.log('🏨 Создаём демо-отель с полной структурой...');

  try {
    // 1. Создаём демо пользователя
    console.log('👤 Создаём демо пользователя...');
    
    // Получаем язык
    const language = await prisma.language.findFirst({
      where: { code: 'en' },
    });
    
    if (!language) {
      throw new Error(
        'Язык English не найден. Запустите сначала базовые seeds.',
      );
    }

    const demoUser = await prisma.user.upsert({
      where: { normalizedEmail: 'DEMO@HOTEL.COM' },
      update: {},
      create: {
        userName: 'demohotel',
        normalizedUserName: 'DEMOHOTEL',
        email: 'demo@hotel.com',
        normalizedEmail: 'DEMO@HOTEL.COM',
        emailConfirmed: true,
        passwordHash: '$2a$10$abcdefghijklmnopqrstuvwxyz123456789', // demo password hash
        defaultLanguageId: language.id,
      },
    });

    // 2. Создаём демо отель
    console.log('🏨 Создаём демо отель...');
    
    // Получаем необходимые справочники
    const country = await prisma.country.findFirst({
      where: { code: 'AM' },
    });
    const currency = await prisma.currency.findFirst({
      where: { code: 'AMD' },
    });

    if (!country || !currency) {
      throw new Error(
        'Страна или валюта не найдены. Запустите сначала базовые seeds.',
      );
    }

    const demoHotel = await prisma.hotel.upsert({
      where: { id: 9999 }, // используем специальный ID для демо
      update: {},
      create: {
        id: 9999,
        name: 'Grand Demo Hotel',
        contactPerson: 'John Doe',
        phoneCode: 374,
        phoneNumber: '77123456',
        logoUrl: 'https://example.com/logo.png',
        websiteUrl: 'https://granddemo.hotel',
        countryId: country.id,
        state: 'Yerevan',
        city: 'Yerevan',
        registerCountryId: country.id,
        registerState: 'Yerevan',
        registerCity: 'Yerevan',
        tinNumber: '01234567',
        director: 'John Doe',
        bankName: 'Demo Bank',
        bankAccountNumber: '123456789',
        bankPhoneCode: 374,
        bankPhoneNumber: '10123456',
        currencyId: currency.id,
        legalPerson: 'Grand Demo Hotel LLC',
        priceSendEmail: 'prices@granddemo.hotel',
      },
    });

    // 3. Связываем пользователя с отелем
    await prisma.userHotel.upsert({
      where: {
        userId_hotelId: {
          userId: demoUser.id,
          hotelId: demoHotel.id,
        },
      },
      update: {},
      create: {
        userId: demoUser.id,
        hotelId: demoHotel.id,
      },
    });

    // 4. Создаём комнату с типами
    console.log('🛏️ Создаём демо комнату...');
    
    // Получаем класс и вид комнаты
    const roomClass = await prisma.roomClass.findFirst({
      where: { name: 'Standard' },
    });
    const roomView = await prisma.roomView.findFirst();

    if (!roomClass) {
      throw new Error(
        'Класс комнаты не найден. Запустите сначала базовые seeds.',
      );
    }

    const demoRoom = await prisma.hotelRoom.upsert({
      where: { id: 9999 },
      update: {},
      create: {
        id: 9999,
        name: 'Demo Standard Room',
        hotelId: demoHotel.id,
        roomClassId: roomClass.id,
        roomViewId: roomView?.id,
        numbers: '101,102,103',
        area: '25',
        mainGuestQuantity: 2,
        additionalGuestQuantity: 1,
        status: 'Active',
        roomNumberQuantity: 3,
        completeness: 'Completed',
      },
    });

    // 5. Создаём части комнаты и связываем с кроватями
    console.log('🏠 Создаём части комнаты и кровати...');
    
    // Получаем части комнаты
    const roomParts = await prisma.roomPart.findMany({
      where: {
        name: { in: ['Bedroom', 'Bathroom'] },
      },
    });

    // Получаем типы и размеры кроватей
    const bedType = await prisma.roomBedType.findFirst({
      where: { name: 'Double' },
    });
    const bedSize = await prisma.roomBedSize.findFirst({
      where: { size: '140' },
    });

    if (!bedType || !bedSize) {
      throw new Error(
        'Тип или размер кровати не найден. Запустите сначала базовые seeds.',
      );
    }

    for (const roomPart of roomParts) {
      // Создаём связь комната-часть
      const hotelRoomPart = await prisma.hotelRoomPart.create({
        data: {
          hotelRoomId: demoRoom.id,
          roomPartId: roomPart.id,
        },
      });

      // Если это спальня, добавляем кровать
      if (roomPart.name === 'Bedroom') {
        await prisma.hotelRoomPartBed.create({
          data: {
            hotelRoomPartId: hotelRoomPart.id,
            bedType: 'Main',
            roomBedSizeId: bedSize.id,
            roomBedTypeId: bedType.id,
            quantity: 1,
          },
        });
      }
    }

    // 6. Создаём cuisines и связываем с отелем
    console.log('🍽️ Создаём блюда и связываем кухни...');
    
    // Получаем кухни
    const cuisines = await prisma.cuisine.findMany({
      where: {
        name: { in: ['Italian', 'Armenian', 'European'] },
      },
    });

    if (cuisines.length === 0) {
      throw new Error('Кухни не найдены. Запустите сначала базовые seeds.');
    }

    // Создаём блюдо отеля
    const hotelFood = await prisma.hotelFood.create({
      data: {
        hotelId: demoHotel.id,
        name: 'Demo Breakfast Package',
        description: 'Continental breakfast with local specialties',
        foodType: 'Breakfast',
        statusId: 'Completed',
        startDate: new Date('2025-01-01'),
        endDate: new Date('2025-12-31'),
      },
    });

    // Связываем блюдо с кухнями
    for (const cuisine of cuisines) {
      await prisma.hotelFoodCuisine.upsert({
        where: {
          hotelFoodId_cuisineId: {
            hotelFoodId: hotelFood.id,
            cuisineId: cuisine.id,
          },
        },
        update: {},
        create: {
          hotelFoodId: hotelFood.id,
          cuisineId: cuisine.id,
        },
      });
    }

    // 7. Создаём hotel availability
    console.log('📅 Создаём доступность отеля...');
    
    const hotelAvailability = await prisma.hotelAvailability.create({
      data: {
        hotelId: demoHotel.id,
        dateFrom: new Date('2025-01-01'),
        dateTo: new Date('2025-12-31'),
      },
    });

    // Создаём цены для комнаты
    await prisma.hotelRoomPrice.create({
      data: {
        hotelRoomId: demoRoom.id,
        price: 50000, // 50,000 AMD
        dateFrom: new Date('2025-01-01'),
        dateTo: new Date('2025-12-31'),
      },
    });

    // Создаём цены для еды
    await prisma.hotelFoodPrice.create({
      data: {
        hotelFoodId: hotelFood.id,
        price: 5000, // 5,000 AMD
        dateFrom: new Date('2025-01-01'),
        dateTo: new Date('2025-12-31'),
      },
    });

    // Создаём возрастные категории
    const ageAssignments = [
      {
        hotelAvailabilityId: hotelAvailability.id,
        name: 'Adult',
        fromAge: 18,
        toAge: null,
        bedType: 'Main' as const,
        isAdditional: false,
      },
      {
        hotelAvailabilityId: hotelAvailability.id,
        name: 'Child',
        fromAge: 3,
        toAge: 17,
        bedType: 'Additional' as const,
        isAdditional: true,
      },
      {
        hotelAvailabilityId: hotelAvailability.id,
        name: 'Infant',
        fromAge: 0,
        toAge: 2,
        bedType: 'Cradle' as const,
        isAdditional: true,
      },
    ];

    for (const assignment of ageAssignments) {
      await prisma.hotelAgeAssignment.create({
        data: assignment,
      });
    }

    console.log('✅ Демо отель успешно создан!');
    console.log('📊 Создано:');
    console.log(`   - Пользователь: ${demoUser.email}`);
    console.log(`   - Отель: ${demoHotel.name} (ID: ${demoHotel.id})`);
    console.log(
      `   - Комната: ${demoRoom.name} (${demoRoom.roomNumberQuantity} номеров)`,
    );
    console.log(`   - Части комнаты: ${roomParts.length}`);
    console.log(`   - Кровати: 1 двуспальная`);
    console.log(`   - Блюдо: ${hotelFood.name}`);
    console.log(`   - Связанные кухни: ${cuisines.length}`);
    console.log(
      `   - Доступность: ${hotelAvailability.dateFrom.toDateString()} - ${hotelAvailability.dateTo.toDateString()}`,
    );
    console.log(`   - Цена комнаты: ${50000} AMD/ночь`);
    console.log(`   - Цена завтрака: ${5000} AMD/персона`);
    console.log(`   - Возрастные категории: 3`);
  } catch (error) {
    console.error('❌ Ошибка при создании демо отеля:', error);
    throw error;
  }
}
