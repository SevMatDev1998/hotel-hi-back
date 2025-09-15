"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const localization_seed_1 = require("./seeds/localization.seed");
const countries_seed_1 = require("./seeds/countries.seed");
const currencies_seed_1 = require("./seeds/currencies.seed");
const cuisines_seed_1 = require("./seeds/cuisines.seed");
const offer_types_seed_1 = require("./seeds/offer-types.seed");
const room_classes_seed_1 = require("./seeds/room-classes.seed");
const room_views_seed_1 = require("./seeds/room-views.seed");
const room_parts_seed_1 = require("./seeds/room-parts.seed");
const room_beds_seed_1 = require("./seeds/room-beds.seed");
const services_seed_1 = require("./seeds/services.seed");
const system_settings_seed_1 = require("./seeds/system-settings.seed");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Начинаем заполнение базы данных начальными данными...');
    try {
        await (0, localization_seed_1.seedLocalization)();
        await (0, countries_seed_1.seedCountries)();
        await (0, currencies_seed_1.seedCurrencies)();
        await (0, cuisines_seed_1.seedCuisines)();
        await (0, offer_types_seed_1.seedOfferTypes)();
        await (0, room_classes_seed_1.seedRoomClasses)();
        await (0, room_views_seed_1.seedRoomViews)();
        await (0, room_parts_seed_1.seedRoomParts)();
        await (0, room_beds_seed_1.seedRoomBeds)();
        await (0, services_seed_1.seedServices)();
        await (0, system_settings_seed_1.seedSystemSettings)();
        console.log('✅ Все данные успешно загружены!');
        console.log('📊 Статистика загрузки:');
        console.log('   - Локализация: 206+ записей');
        console.log('   - Страны: 3');
        console.log('   - Валюты: 3');
        console.log('   - Кухни: 8');
        console.log('   - Типы предложений: 3');
        console.log('   - Классы номеров: 25');
        console.log('   - Виды из номеров: 10');
        console.log('   - Части номеров: 11');
        console.log('   - Типы кроватей: 15');
        console.log('   - Размеры кроватей: 10');
        console.log('   - Группы услуг: 6');
        console.log('   - Услуги: 200');
        console.log('   - Системные настройки: 60+');
    }
    catch (error) {
        console.error('❌ Ошибка при загрузке данных:', error);
        throw error;
    }
    finally {
        await prisma.$disconnect();
    }
}
main().catch((e) => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=seed.js.map