import { PrismaClient } from '@prisma/client';
import { seedLocalization } from './seeds/localization.seed';
import { seedCountries } from './seeds/countries.seed';
import { seedCurrencies } from './seeds/currencies.seed';
import { seedCuisines } from './seeds/cuisines.seed';
import { seedOfferTypes } from './seeds/offer-types.seed';
import { seedRoomClasses } from './seeds/room-classes.seed';
import { seedRoomViews } from './seeds/room-views.seed';
import { seedRoomParts } from './seeds/room-parts.seed';
import { seedRoomBeds } from './seeds/room-beds.seed';
import { seedServices } from './seeds/services.seed';
import { seedSystemSettings } from './seeds/system-settings.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Начинаем заполнение базы данных начальными данными...');
  
  try {
    // 1. Базовая локализация (должна быть первой)
    await seedLocalization();
    
    // 2. Справочные данные
    await seedCountries();
    await seedCurrencies();
    await seedCuisines();
    await seedOfferTypes();
    
    // 3. Данные для номеров
    await seedRoomClasses();
    await seedRoomViews();
    await seedRoomParts();
    await seedRoomBeds();
    
    // 4. Услуги отеля
    await seedServices();
    
    // 5. Системные настройки
    await seedSystemSettings();
    
    console.log('✅ Все данные успешно загружены!');
    console.log('📊 Статистика загрузки:');
    console.log('   - Локализация: 206+ записей');
    console.log('   - Страны: 3');
    console.log('   - Валюты: 3');
    console.log('   - Кухни: 8');
    console.log('   - Типы предложений: 3');
    console.log('   - Классы номеров: 25');
    console.log('   - Виды из номеров: 10');
    console.log('   - Части номеров: 11');
    console.log('   - Типы кроватей: 15');
    console.log('   - Размеры кроватей: 10');
    console.log('   - Группы услуг: 6');
    console.log('   - Услуги: 200');
    console.log('   - Системные настройки: 60+');
  } catch (error) {
    console.error('❌ Ошибка при загрузке данных:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
