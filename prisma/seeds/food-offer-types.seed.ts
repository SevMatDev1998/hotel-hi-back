import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedFoodOfferTypes() {
  console.log('🎯 Загружаем типы предложений еды...');

  const foodOfferTypes = [
    { name: 'Swedish' },
    { name: 'PersonalDelivery' },
    { name: 'DeliveryRoom' },
  ];

  // Создаем типы предложений еды
  const existingFoodOfferTypes = await prisma.foodOfferType.findMany();
  if (existingFoodOfferTypes.length === 0) {
    await prisma.foodOfferType.createMany({
      data: foodOfferTypes,
      skipDuplicates: true,
    });
  }

  // Добавляем переводы для типов предложений еды
  const armenianLang = await prisma.language.findFirst({
    where: { code: 'hy' },
  });
  const englishLang = await prisma.language.findFirst({
    where: { code: 'en' },
  });

  if (armenianLang && englishLang) {
    const foodOfferTypeTranslations = [
      {
        key: 'Swedish',
        translations: {
          [englishLang.id]: 'Swedish',
          [armenianLang.id]: 'Շվեդական',
        },
      },
      {
        key: 'PersonalDelivery',
        translations: {
          [englishLang.id]: 'Personal Delivery',
          [armenianLang.id]: 'Անձնական առաքման',
        },
      },
      {
        key: 'DeliveryRoom',
        translations: {
          [englishLang.id]: 'Delivery Room',
          [armenianLang.id]: 'Սենյակ առաքում',
        },
      },
    ];

    for (const item of foodOfferTypeTranslations) {
      const foodOfferType = await prisma.foodOfferType.findFirst({
        where: { name: item.key },
      });
      if (foodOfferType) {
        for (const [languageId, value] of Object.entries(item.translations)) {
          await prisma.localizationResource.upsert({
            where: {
              key_languageId: {
                key: `FoodOfferType_${foodOfferType.id}`,
                languageId: parseInt(languageId),
              },
            },
            update: { value },
            create: {
              key: `FoodOfferType_${foodOfferType.id}`,
              value,
              languageId: parseInt(languageId),
            },
          });
        }
      }
    }
  }

  console.log('✅ Типы предложений еды загружены!');
}
