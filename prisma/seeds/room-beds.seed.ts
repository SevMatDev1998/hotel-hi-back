import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRoomBeds(): Promise<void> {
  console.log('🛏️ Загружаем типы и размеры кроватей...');

  const roomBedTypes: Array<{ name: string; personCount: number }> = [
    { name: 'Single', personCount: 1 },
    { name: 'Double', personCount: 2 },
    { name: 'Queen', personCount: 2 },
    { name: 'King', personCount: 2 },
    { name: 'Twin', personCount: 2 },
    { name: 'Full', personCount: 2 },
    { name: 'California King', personCount: 2 },
    { name: 'Bunk', personCount: 1 },
    { name: 'Sofa', personCount: 4 },
    { name: 'Murphy', personCount: 1 },
    { name: 'Daybed', personCount: 2 },
    { name: 'Futon', personCount: 2 },
    { name: 'Rollaway', personCount: 2 },
    { name: 'Cradle', personCount: 2 },
    { name: 'Crib', personCount: 1 },
    { name: 'Bassinet', personCount: 3 },
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
