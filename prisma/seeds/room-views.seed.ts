import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRoomViews() {
  console.log('🏔 Загружаем виды из номеров...');

  const roomViews = [
    { name: 'Garden' },
    { name: 'Lake' },
    { name: 'Mountain' },
    { name: 'Sea' },
    { name: 'River' },
    { name: 'City' },
    { name: 'Courtyard' },
    { name: 'Pool' },
    { name: 'Forest' },
    { name: 'Parking' },
  ];

  // Создаем виды номеров
  const existingRoomViews = await prisma.roomView.findMany();
  if (existingRoomViews.length === 0) {
    await prisma.roomView.createMany({
      data: roomViews,
      skipDuplicates: true,
    });
  }

  console.log('✅ Виды из номеров загружены!');
}
