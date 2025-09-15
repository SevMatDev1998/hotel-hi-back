"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedOfferTypes = seedOfferTypes;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedOfferTypes() {
    console.log('🎯 Загружаем типы предложений...');
    const offerTypes = [
        { name: 'Swedish' },
        { name: 'PersonalDelivery' },
        { name: 'DeliveryRoom' },
    ];
    const existingOfferTypes = await prisma.offerType.findMany();
    if (existingOfferTypes.length === 0) {
        await prisma.offerType.createMany({
            data: offerTypes,
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
        const offerTypeTranslations = [
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
        for (const item of offerTypeTranslations) {
            const offerType = await prisma.offerType.findFirst({
                where: { name: item.key },
            });
            if (offerType) {
                for (const [languageId, value] of Object.entries(item.translations)) {
                    await prisma.localizationResource.upsert({
                        where: {
                            key_languageId: {
                                key: `OfferType_${offerType.id}`,
                                languageId: parseInt(languageId),
                            },
                        },
                        update: { value },
                        create: {
                            key: `OfferType_${offerType.id}`,
                            value,
                            languageId: parseInt(languageId),
                        },
                    });
                }
            }
        }
    }
    console.log('✅ Типы предложений загружены!');
}
//# sourceMappingURL=offer-types.seed.js.map