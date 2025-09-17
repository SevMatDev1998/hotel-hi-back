"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRoomBeds = seedRoomBeds;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedRoomBeds() {
    console.log('🛏️ Загружаем типы и размеры кроватей...');
    const roomBedTypes = [
        { name: 'Single' },
        { name: 'Double' },
        { name: 'Queen' },
        { name: 'King' },
        { name: 'Twin' },
        { name: 'Full' },
        { name: 'California King' },
        { name: 'Bunk' },
        { name: 'Sofa' },
        { name: 'Murphy' },
        { name: 'Daybed' },
        { name: 'Futon' },
        { name: 'Rollaway' },
        { name: 'Cradle' },
        { name: 'Crib' },
        { name: 'Bassinet' },
    ];
    try {
        const bedTypesCount = await prisma.roomBedType.count();
        if (bedTypesCount === 0) {
            await prisma.roomBedType.createMany({
                data: roomBedTypes,
                skipDuplicates: true,
            });
            console.log('✅ Типы кроватей созданы!');
        }
        else {
            console.log('ℹ️ Типы кроватей уже существуют');
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error seeding bed types:', err.message);
        }
        else {
            console.error('Error seeding bed types:', err);
        }
    }
    const roomBedSizes = [
        { size: '80' },
        { size: '90' },
        { size: '120' },
        { size: '140' },
        { size: '160' },
        { size: '180' },
        { size: '200' },
        { size: '70' },
        { size: '60' },
    ];
    try {
        const bedSizesCount = await prisma.roomBedSize.count();
        if (bedSizesCount === 0) {
            await prisma.roomBedSize.createMany({
                data: roomBedSizes,
                skipDuplicates: true,
            });
            console.log('✅ Размеры кроватей созданы!');
        }
        else {
            console.log('ℹ️ Размеры кроватей уже существуют');
        }
    }
    catch (err) {
        if (err instanceof Error) {
            console.error('Error seeding bed sizes:', err.message);
        }
        else {
            console.error('Error seeding bed sizes:', err);
        }
    }
    console.log('✅ Типы и размеры кроватей загружены!');
}
//# sourceMappingURL=room-beds.seed.js.map