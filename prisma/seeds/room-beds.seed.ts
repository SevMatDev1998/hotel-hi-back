import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRoomBeds(): Promise<void> {
  console.log('🛏️ Загружаем типы и размеры кроватей...');

  const roomBedTypes: Array<{ name: string }> = [
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
  try {
    const bedTypesCount = await prisma.roomBedType.count();
    if (bedTypesCount === 0) {
      await prisma.roomBedType.createMany({
        data: roomBedTypes,
        skipDuplicates: true,
      });
      console.log('✅ Типы кроватей созданы!');
    } else {
      console.log('ℹ️ Типы кроватей уже существуют');
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error seeding bed types:', err.message);
    } else {
      console.error('Error seeding bed types:', err);
    }
  }

  const roomBedSizes: Array<{ size: string }> = [
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
    const bedSizesCount = await prisma.roomBedSize.count();
    if (bedSizesCount === 0) {
      await prisma.roomBedSize.createMany({
        data: roomBedSizes,
        skipDuplicates: true,
      });
      console.log('✅ Размеры кроватей созданы!');
    } else {
      console.log('ℹ️ Размеры кроватей уже существуют');
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Error seeding bed sizes:', err.message);
    } else {
      console.error('Error seeding bed sizes:', err);
    }
  }

  console.log('✅ Типы и размеры кроватей загружены!');
}
