import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRoomBeds() {
  console.log('🛏️ Загружаем типы и размеры кроватей...');

  const roomBedTypes = [
    { name: 'Single' },
    { name: 'Double' },
    { name: 'Queen' },
    { name: 'King' },
    { name: 'Twin' },
    { name: 'Full' },
    { name: 'California King' },
    { name: 'Bunk' },
    { name: 'Sofa' },
    { name: 'Murphy' },
    { name: 'Daybed' },
    { name: 'Futon' },
    { name: 'Rollaway' },
    { name: 'Cradle' },
    { name: 'Crib' },
    { name: 'Bassinet' },
  ];

  // Создаем типы кроватей
  // try {
  //   const existingBedTypes = await prisma.roomBedType.findMany();
  //   if (existingBedTypes.length === 0) {
  //     await prisma.roomBedType.createMany({
  //       data: roomBedTypes,
  //       skipDuplicates: true,
  //     });
  //     console.log('✅ Типы кроватей созданы!');
  //   } else {
  //     console.log('ℹ️ Типы кроватей уже существуют');
  //   }
  // } catch (error) {
  //   console.error('Error seeding bed types:', error);
  // }

  const roomBedSizes = [
    { size: '80' }, // Single
    { size: '90' }, // Single wide
    { size: '120' }, // Small double
    { size: '140' }, // Double
    { size: '160' }, // Queen
    { size: '180' }, // King
    { size: '200' }, // Super King
    { size: '70' }, // Child bed
    { size: '60' }, // Crib/Cradle
  ];

  // Создаем размеры кроватей
  try {
    const existingBedSizes = await prisma.roomBedSize.findMany();
    if (existingBedSizes.length === 0) {
      await prisma.roomBedSize.createMany({
        data: roomBedSizes,
        skipDuplicates: true,
      });
    }
  } catch (error) {
    console.error('Error seeding bed sizes:', error);
  }

  console.log('✅ Типы и размеры кроватей загружены!');
}
