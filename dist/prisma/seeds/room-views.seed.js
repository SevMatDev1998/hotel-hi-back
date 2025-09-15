"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRoomViews = seedRoomViews;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedRoomViews() {
    console.log('🏔 Загружаем виды из номеров...');
    const roomViews = [
        { name: 'Garden' },
        { name: 'Lake' },
        { name: 'Mountain' },
        { name: 'Sea' },
        { name: 'River' },
        { name: 'City' },
        { name: 'Courtyard' },
        { name: 'Pool' },
        { name: 'Forest' },
        { name: 'Parking' },
    ];
    const existingRoomViews = await prisma.roomView.findMany();
    if (existingRoomViews.length === 0) {
        await prisma.roomView.createMany({
            data: roomViews,
            skipDuplicates: true,
        });
    }
    console.log('✅ Виды из номеров загружены!');
}
//# sourceMappingURL=room-views.seed.js.map