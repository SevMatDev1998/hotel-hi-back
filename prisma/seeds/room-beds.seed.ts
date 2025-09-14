import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRoomBeds() {
  console.log('🛏️ Загружаем типы и размеры кроватей...');

  const roomBedSizeTypes = [
    { name: 'Single bed' },
    { name: 'Double bed' },
    { name: 'Queen bed' },
    { name: 'King bed' },
    { name: 'Twin bed' },
    { name: 'Full bed' },
    { name: 'California King' },
    { name: 'Bunk bed' },
    { name: 'Sofa bed' },
    { name: 'Murphy bed' },
    { name: 'Daybed' },
    { name: 'Futon' },
    { name: 'Rollaway bed' },
    { name: 'Crib' },
    { name: 'Bassinet' },
  ];

  // Создаем типы кроватей
  const existingBedTypes = await prisma.roomBedSizeType.findMany();
  if (existingBedTypes.length === 0) {
    await prisma.roomBedSizeType.createMany({
      data: roomBedSizeTypes,
      skipDuplicates: true,
    });
  }

  // Получаем созданные типы кроватей для связи с размерами
  const bedTypes = await prisma.roomBedSizeType.findMany();

  const roomBedSizes = [
    { size: 'Twin', roomBedSizeTypeId: bedTypes[4]?.id || 1 }, // Twin bed
    { size: 'Twin XL', roomBedSizeTypeId: bedTypes[4]?.id || 1 }, // Twin bed
    { size: 'Full', roomBedSizeTypeId: bedTypes[5]?.id || 2 }, // Full bed
    { size: 'Queen', roomBedSizeTypeId: bedTypes[2]?.id || 3 }, // Queen bed
    { size: 'King', roomBedSizeTypeId: bedTypes[3]?.id || 4 }, // King bed
    { size: 'California King', roomBedSizeTypeId: bedTypes[6]?.id || 5 }, // California King
    { size: 'Single', roomBedSizeTypeId: bedTypes[0]?.id || 1 }, // Single bed
    { size: 'Double', roomBedSizeTypeId: bedTypes[1]?.id || 2 }, // Double bed
    { size: 'Super Single', roomBedSizeTypeId: bedTypes[0]?.id || 1 }, // Single bed
    { size: 'Emperor', roomBedSizeTypeId: bedTypes[3]?.id || 4 }, // King bed
  ];

  // Создаем размеры кроватей
  const existingBedSizes = await prisma.roomBedSize.findMany();
  if (existingBedSizes.length === 0) {
    await prisma.roomBedSize.createMany({
      data: roomBedSizes,
      skipDuplicates: true,
    });
  }

  console.log('✅ Типы и размеры кроватей загружены!');
}
