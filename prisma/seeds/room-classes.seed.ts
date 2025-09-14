import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRoomClasses() {
  console.log('🛏 Загружаем классы номеров...');

  const roomClasses = [
    { name: 'Dormitory' },
    { name: 'Economy' },
    { name: 'Standard' },
    { name: 'Deluxe' },
    { name: 'Suite' },
    { name: 'Luxe' },
    { name: 'Presidental' },
    { name: 'Family' },
    { name: 'GlampingTent' },
    { name: 'CabinOrCottage' },
    { name: 'Villa' },
    { name: 'Apartment' },
    { name: 'Studio' },
    { name: 'AFrame' },
    { name: 'Barnhouse' },
    { name: 'Bungalow' },
    { name: 'Camp' },
    { name: 'Tent' },
    { name: 'Chalet' },
    { name: 'Affordable' },
    { name: 'Capsule' },
    { name: 'Cabana' },
    { name: 'Boutique' },
    { name: 'Micro' },
  ];

  // Создаем классы номеров
  const existingRoomClasses = await prisma.roomClass.findMany();
  if (existingRoomClasses.length === 0) {
    await prisma.roomClass.createMany({
      data: roomClasses,
      skipDuplicates: true,
    });
  }

  console.log('✅ Классы номеров загружены!');
}
