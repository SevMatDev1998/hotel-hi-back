"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedCurrencies = seedCurrencies;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedCurrencies() {
    console.log('💰 Загружаем валюты...');
    const currencies = [
        {
            name: 'Armenian Dram',
            code: 'AMD',
            symbol: '֏',
        },
        {
            name: 'US Dollar',
            code: 'USD',
            symbol: '$',
        },
        {
            name: 'Russian Ruble',
            code: 'RUB',
            symbol: '₽',
        },
    ];
    const existingCurrencies = await prisma.currency.findMany();
    if (existingCurrencies.length === 0) {
        await prisma.currency.createMany({
            data: currencies,
            skipDuplicates: true,
        });
    }
    const armenianLang = await prisma.language.findFirst({
        where: { code: 'hy' },
    });
    const englishLang = await prisma.language.findFirst({
        where: { code: 'en' },
    });
    if (armenianLang && englishLang) {
        const currencyTranslations = [
            {
                key: 'AMD',
                translations: {
                    [englishLang.id]: 'Armenian Dram',
                    [armenianLang.id]: 'Դրամ',
                },
            },
            {
                key: 'USD',
                translations: {
                    [englishLang.id]: 'US Dollar',
                    [armenianLang.id]: 'ԱՄՆ դոլար',
                },
            },
            {
                key: 'RUB',
                translations: {
                    [englishLang.id]: 'Russian Ruble',
                    [armenianLang.id]: 'Ռուսական ռուբլի',
                },
            },
        ];
        for (const item of currencyTranslations) {
            const currency = await prisma.currency.findFirst({
                where: { code: item.key },
            });
            if (currency) {
                for (const [languageId, value] of Object.entries(item.translations)) {
                    await prisma.localizationResource.upsert({
                        where: {
                            key_languageId: {
                                key: `Currency_${currency.id}`,
                                languageId: parseInt(languageId),
                            },
                        },
                        update: { value },
                        create: {
                            key: `Currency_${currency.id}`,
                            value,
                            languageId: parseInt(languageId),
                        },
                    });
                }
            }
        }
    }
    console.log('✅ Валюты загружены!');
}
//# sourceMappingURL=currencies.seed.js.map