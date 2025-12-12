"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRoomParts = seedRoomParts;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedRoomParts() {
    console.log('🏠 Загружаем части номеров...');
    const roomParts = [
        { name: 'Hallway' },
        { name: 'LivingRoom' },
        { name: 'Bedroom' },
        { name: 'Bathroom' },
        { name: 'Toilet' },
        { name: 'Kitchen' },
        { name: 'Balcony' },
        { name: 'FrenchBalcony' },
        { name: 'Closet' },
        { name: 'Office' },
        { name: 'Terrace' },
    ];
    const existingRoomParts = await prisma.roomPart.findMany();
    if (existingRoomParts.length === 0) {
        await prisma.roomPart.createMany({
            data: roomParts,
            skipDuplicates: true,
        });
    }
    console.log('✅ Части номеров загружены!');
}
//# sourceMappingURL=room-parts.seed.js.map