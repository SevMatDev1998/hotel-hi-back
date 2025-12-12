import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedRoomViews() {
  console.log('🏔 Загружаем виды из номеров...');

  const roomViews = [
    { name: 'Garden' },
    { name: 'Lake' },
    { name: 'Mountain' },
    { name: 'Park' },
    { name: 'Pool' },
    { name: 'Sea' },
    { name: 'Castle' },
    { name: 'City' },
    { name: 'River' },
    { name: 'Ocean' },
  ];

  // Создаём новые
  await prisma.roomView.createMany({
    data: roomViews,
  });

  console.log('✅ Виды из номеров загружены!');
}
