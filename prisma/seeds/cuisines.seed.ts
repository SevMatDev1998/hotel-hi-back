import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCuisines() {
  console.log('🍽 Загружаем типы кухонь...');

      const cuisines = [
    { name: 'General' },
    { name: 'Vegetarians' },
    { name: 'Diet' },
    { name: 'PreparedOnSite' },
    { name: 'Armenian' },
    { name: 'English' },
    { name: 'French' },
    { name: 'Other' },
  ];

  // Создаем кухни
  const existingCuisines = await prisma.cuisine.findMany();
  if (existingCuisines.length === 0) {
    await prisma.cuisine.createMany({
      data: cuisines,
      skipDuplicates: true,
    });
  }

  // Добавляем переводы для кухонь
  const armenianLang = await prisma.language.findFirst({
    where: { code: 'hy' },
  });
  const englishLang = await prisma.language.findFirst({
    where: { code: 'en' },
  });

  if (armenianLang && englishLang) {
    const cuisineTranslations = [
      {
        key: 'General',
        translations: {
          [englishLang.id]: 'General',
          [armenianLang.id]: 'Ընդհանուր',
        },
      },
      {
        key: 'Vegetarians',
        translations: {
          [englishLang.id]: 'Vegetarians',
          [armenianLang.id]: 'Բուսակերների',
        },
      },
      {
        key: 'Diet',
        translations: {
          [englishLang.id]: 'Diet',
          [armenianLang.id]: 'Դիետիկ',
        },
      },
      {
        key: 'PreparedOnSite',
        translations: {
          [englishLang.id]: 'Prepared On Site',
          [armenianLang.id]: 'Պատրաստված է տեղում',
        },
      },
      {
        key: 'Armenian',
        translations: {
          [englishLang.id]: 'Armenian',
          [armenianLang.id]: 'Հայկական',
        },
      },
      {
        key: 'English',
        translations: {
          [englishLang.id]: 'English',
          [armenianLang.id]: 'Անգլիական',
        },
      },
      {
        key: 'French',
        translations: {
          [englishLang.id]: 'French',
          [armenianLang.id]: 'Ֆրանսիական',
        },
      },
      {
        key: 'Other',
        translations: {
          [englishLang.id]: 'Other',
          [armenianLang.id]: 'Այլ',
        },
      },
    ];

    for (const item of cuisineTranslations) {
      const cuisine = await prisma.cuisine.findFirst({
        where: { name: item.key },
      });
      if (cuisine) {
        for (const [languageId, value] of Object.entries(item.translations)) {
          await prisma.localizationResource.upsert({
            where: {
              key_languageId: {
                key: `Cuisine_${cuisine.id}`,
                languageId: parseInt(languageId),
              },
            },
            update: { value },
            create: {
              key: `Cuisine_${cuisine.id}`,
              value,
              languageId: parseInt(languageId),
            },
          });
        }
      }
    }
  }

  console.log('✅ Типы кухонь загружены!');
}
