"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const localization_seed_1 = require("./seeds/localization.seed");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Начинаем заполнение базы данных начальными данными...');
    try {
        await (0, localization_seed_1.seedLocalization)();
        console.log('✅ Все данные успешно загружены!');
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