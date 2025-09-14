import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRoomParts() {
  console.log('🏠 Загружаем части номеров...');

  const roomParts = [
    { name: 'Bedroom' },
    { name: 'Kitchen' },
    { name: 'Living room' },
    { name: 'Bathroom' },
    { name: 'Balcony' },
    { name: 'Terrace' },
    { name: 'Dining room' },
    { name: 'Office' },
    { name: 'Garage' },
    { name: 'Closet' },
    { name: 'Toilet' },
  ];

  // Создаем части номеров
  const existingRoomParts = await prisma.roomPart.findMany();
  if (existingRoomParts.length === 0) {
    await prisma.roomPart.createMany({
      data: roomParts,
      skipDuplicates: true,
    });
  }

  console.log('✅ Части номеров загружены!');
}
