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
        { name: 'Park' },
        { name: 'Pool' },
        { name: 'Sea' },
        { name: 'Castle' },
        { name: 'City' },
        { name: 'River' },
        { name: 'Ocean' },
    ];
    await prisma.roomView.createMany({
        data: roomViews,
    });
    console.log('✅ Виды из номеров загружены!');
}
//# sourceMappingURL=room-views.seed.js.map