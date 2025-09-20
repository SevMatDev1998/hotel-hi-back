import { PrismaClient } from '@prisma/client';
import { seedHotelDemo } from './seeds/hotel-demo.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🏨 Запускаем создание демо отеля...');

  try {
    await seedHotelDemo();

    console.log('✅ Демо отель успешно создан!');
    console.log('📊 Создано:');
    console.log('   - 1 отель');
    console.log('   - 1 пользователь');
    console.log('   - 1 комната с типами');
    console.log('   - Связи с кроватями');
    console.log('   - Кухни отеля');
    console.log('   - Доступность отеля');
  } catch (error) {
    console.error('❌ Ошибка при создании демо отеля:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
