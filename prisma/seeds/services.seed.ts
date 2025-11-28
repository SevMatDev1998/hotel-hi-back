import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function seedServices() {
  console.log('🏨 Загружаем услуги отеля...');
  console.log('♻️ Очищаем существующие записи...');
  console.log('♻️ Очищаем существующие записи...');

  // 1. Сначала удаляем связи с сервисами
  await prisma.hotelService.deleteMany().catch(() => {});

  // 2. Затем удаляем сами сервисы
  await prisma.systemService.deleteMany().catch(() => {});

  // 3. Затем типы
  await prisma.systemServiceType.deleteMany().catch(() => {});

  // 4. И в конце группы
  await prisma.systemServiceGroup.deleteMany().catch(() => {});
  console.log('✅ Существующие записи очищены.');

  // === 1️⃣ Create groups ===
  const serviceGroups = [
    { name: 'Additional service group' }, // ⭐ Для Arrival/Departure
    { name: 'Parking and Transport' },
    { name: 'Hotel Amenities' },
    { name: 'Family Entertainment' },
    { name: 'Food and Restaurant' },
    { name: 'Business' },
    { name: 'Health and Spa' },
  ];

  const existingGroups = await prisma.systemServiceGroup.findMany();
  if (existingGroups.length === 0) {
    await prisma.systemServiceGroup.createMany({
      data: serviceGroups,
      skipDuplicates: true,
    });
  }

  const groups = await prisma.systemServiceGroup.findMany();

  const additionalGroup =
    groups.find((g) => g.name === 'Additional service group') || groups[0];
  const parkingGroup =
    groups.find((g) => g.name === 'Parking and Transport') || groups[1];
  const amenitiesGroup =
    groups.find((g) => g.name === 'Hotel Amenities') || groups[2];
  const familyGroup =
    groups.find((g) => g.name === 'Family Entertainment') || groups[3];
  const foodGroup =
    groups.find((g) => g.name === 'Food and Restaurant') || groups[4];
  const businessGroup = groups.find((g) => g.name === 'Business') || groups[5];
  const healthGroup =
    groups.find((g) => g.name === 'Health and Spa') || groups[6];

  // === 2️⃣ Create types (каждый тип принадлежит группе) ===
  const serviceTypes = [
    {
      name: 'Additional service type',
      systemServiceGroupId: additionalGroup.id,
    }, // ⭐
    { name: 'Basic', systemServiceGroupId: parkingGroup.id },
    { name: 'Premium', systemServiceGroupId: amenitiesGroup.id },
    { name: 'Luxury', systemServiceGroupId: amenitiesGroup.id },
    { name: 'Free', systemServiceGroupId: familyGroup.id },
    { name: 'Paid', systemServiceGroupId: foodGroup.id },
  ];

  const existingTypes = await prisma.systemServiceType.findMany();
  if (existingTypes.length === 0) {
    await prisma.systemServiceType.createMany({
      data: serviceTypes,
      skipDuplicates: true,
    });
  }

  const types = await prisma.systemServiceType.findMany();

  const additionalType =
    types.find((t) => t.name === 'Additional service type') || types[0];
  const basicType = types.find((t) => t.name === 'Basic') || types[1];
  const premiumType = types.find((t) => t.name === 'Premium') || types[2];
  const freeType = types.find((t) => t.name === 'Free') || types[4];
  const paidType = types.find((t) => t.name === 'Paid') || types[5];

  // === 3️⃣ Create services (ТОЛЬКО systemServiceTypeId!) ===
  const services = [
    // ⭐ ARRIVAL & DEPARTURE - как в C# коде!
    {
      name: 'Arrival',
      systemServiceTypeId: additionalType.id,
      isAdditional: true,
    },
    {
      name: 'Departure',
      systemServiceTypeId: additionalType.id,
      isAdditional: true,
    },
    {
      name: 'Food delivery',
      systemServiceTypeId: additionalType.id,
      isAdditional: true,
    },
    {
      name: 'Provision of a crib',
      systemServiceTypeId: additionalType.id,
      isAdditional: true,
    },

    // Parking and Transport
    { name: 'Free parking', systemServiceTypeId: freeType.id },
    { name: 'Paid parking', systemServiceTypeId: paidType.id },
    { name: 'Valet parking', systemServiceTypeId: premiumType.id },
    {
      name: 'Electric vehicle charging station',
      systemServiceTypeId: basicType.id,
    },
    { name: 'Garage', systemServiceTypeId: basicType.id },
    { name: 'Covered parking', systemServiceTypeId: basicType.id },
    { name: 'Airport shuttle', systemServiceTypeId: basicType.id },
    { name: 'Free airport shuttle', systemServiceTypeId: freeType.id },
    { name: 'Paid airport shuttle', systemServiceTypeId: paidType.id },
    { name: 'Taxi service', systemServiceTypeId: paidType.id },
    { name: 'Car rental', systemServiceTypeId: paidType.id },
    { name: 'Bicycle rental', systemServiceTypeId: paidType.id },

    // Hotel Amenities
    { name: 'Free WiFi', systemServiceTypeId: freeType.id },
    { name: 'Paid WiFi', systemServiceTypeId: paidType.id },
    { name: 'High-speed internet', systemServiceTypeId: premiumType.id },
    { name: '24-hour front desk', systemServiceTypeId: basicType.id },
    { name: 'Concierge service', systemServiceTypeId: premiumType.id },
    { name: 'Luggage storage', systemServiceTypeId: freeType.id },
    { name: 'Bell service', systemServiceTypeId: basicType.id },
    { name: 'Room service', systemServiceTypeId: premiumType.id },

    // Family Entertainment
    { name: 'Kids club', systemServiceTypeId: basicType.id },
    { name: 'Playground', systemServiceTypeId: freeType.id },
    { name: 'Game room', systemServiceTypeId: basicType.id },
    { name: 'Pool', systemServiceTypeId: basicType.id },
    { name: 'Water slides', systemServiceTypeId: premiumType.id },

    // Food and Restaurant
    { name: 'Restaurant', systemServiceTypeId: basicType.id },
    { name: 'Bar', systemServiceTypeId: basicType.id },
    { name: 'Breakfast included', systemServiceTypeId: freeType.id },
    { name: 'All inclusive', systemServiceTypeId: premiumType.id },
    { name: 'Kitchen', systemServiceTypeId: basicType.id },

    // Business
    { name: 'Business center', systemServiceTypeId: basicType.id },
    { name: 'Meeting rooms', systemServiceTypeId: premiumType.id },
    { name: 'Conference facilities', systemServiceTypeId: premiumType.id },
    { name: 'Printing services', systemServiceTypeId: paidType.id },

    // Health and Spa
    { name: 'Spa', systemServiceTypeId: premiumType.id },
    { name: 'Fitness center', systemServiceTypeId: basicType.id },
    { name: 'Sauna', systemServiceTypeId: premiumType.id },
    { name: 'Massage', systemServiceTypeId: premiumType.id },
    { name: 'Wellness center', systemServiceTypeId: premiumType.id },
  ];

  const existingServices = await prisma.systemService.findMany();
  if (existingServices.length === 0) {
    await prisma.systemService.createMany({
      data: services,
      skipDuplicates: true,
    });
  }

  console.log('✅ Услуги отеля загружены!');
  console.log(`   📦 Групп: ${groups.length}`);
  console.log(`   📋 Типов: ${types.length}`);
  console.log(`   🔧 Сервисов: ${services.length}`);
}
