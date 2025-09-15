"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRoomBeds = seedRoomBeds;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedRoomBeds() {
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
    const existingBedTypes = await prisma.roomBedSizeType.findMany();
    if (existingBedTypes.length === 0) {
        await prisma.roomBedSizeType.createMany({
            data: roomBedSizeTypes,
            skipDuplicates: true,
        });
    }
    const bedTypes = await prisma.roomBedSizeType.findMany();
    const roomBedSizes = [
        { size: 'Twin', roomBedSizeTypeId: bedTypes[4]?.id || 1 },
        { size: 'Twin XL', roomBedSizeTypeId: bedTypes[4]?.id || 1 },
        { size: 'Full', roomBedSizeTypeId: bedTypes[5]?.id || 2 },
        { size: 'Queen', roomBedSizeTypeId: bedTypes[2]?.id || 3 },
        { size: 'King', roomBedSizeTypeId: bedTypes[3]?.id || 4 },
        { size: 'California King', roomBedSizeTypeId: bedTypes[6]?.id || 5 },
        { size: 'Single', roomBedSizeTypeId: bedTypes[0]?.id || 1 },
        { size: 'Double', roomBedSizeTypeId: bedTypes[1]?.id || 2 },
        { size: 'Super Single', roomBedSizeTypeId: bedTypes[0]?.id || 1 },
        { size: 'Emperor', roomBedSizeTypeId: bedTypes[3]?.id || 4 },
    ];
    const existingBedSizes = await prisma.roomBedSize.findMany();
    if (existingBedSizes.length === 0) {
        await prisma.roomBedSize.createMany({
            data: roomBedSizes,
            skipDuplicates: true,
        });
    }
    console.log('✅ Типы и размеры кроватей загружены!');
}
//# sourceMappingURL=room-beds.seed.js.map