import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedCountries() {
  console.log('🌍 Загружаем страны...');

  const countries = [
    { name: 'Armenia', code: 'AM' },
    { name: 'United States', code: 'US' },
    { name: 'Russia', code: 'RU' },
  ];

  // Создаем страны используя createMany для избежания конфликтов
  const existingCountries = await prisma.country.findMany();
  if (existingCountries.length === 0) {
    await prisma.country.createMany({
      data: countries,
      skipDuplicates: true,
    });
  }

  // Добавляем переводы для стран
  const armenianLang = await prisma.language.findFirst({
    where: { code: 'hy' },
  });
  const englishLang = await prisma.language.findFirst({
    where: { code: 'en' },
  });

  if (armenianLang && englishLang) {
    const countryTranslations = [
      {
        key: 'Armenia',
        translations: {
          [englishLang.id]: 'Armenia',
          [armenianLang.id]: 'Հայաստան',
        },
      },
      {
        key: 'United States',
        translations: {
          [englishLang.id]: 'United States',
          [armenianLang.id]: 'Միացյալ Նահանգներ',
        },
      },
      {
        key: 'Russia',
        translations: {
          [englishLang.id]: 'Russia',
          [armenianLang.id]: 'Ռուսաստան',
        },
      },
    ];

    for (const item of countryTranslations) {
      const country = await prisma.country.findFirst({
        where: { name: item.key },
      });
      if (country) {
        for (const [languageId, value] of Object.entries(item.translations)) {
          await prisma.localizationResource.upsert({
            where: {
              key_languageId: {
                key: `Country_${country.id}`,
                languageId: parseInt(languageId),
              },
            },
            update: { value },
            create: {
              key: `Country_${country.id}`,
              value,
              languageId: parseInt(languageId),
            },
          });
        }
      }
    }
  }

  console.log('✅ Страны загружены!');
}
