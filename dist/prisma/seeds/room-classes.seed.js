"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedRoomClasses = seedRoomClasses;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedRoomClasses() {
    console.log('🛏 Загружаем классы номеров...');
    const roomClasses = [
        { name: 'Dormitory' },
        { name: 'Economy' },
        { name: 'Standard' },
        { name: 'Deluxe' },
        { name: 'Suite' },
        { name: 'Luxe' },
        { name: 'Presidental' },
        { name: 'Family' },
        { name: 'GlampingTent' },
        { name: 'CabinOrCottage' },
        { name: 'Villa' },
        { name: 'Apartment' },
        { name: 'Studio' },
        { name: 'AFrame' },
        { name: 'Barnhouse' },
        { name: 'Bungalow' },
        { name: 'Camp' },
        { name: 'Tent' },
        { name: 'Chalet' },
        { name: 'Affordable' },
        { name: 'Capsule' },
        { name: 'Cabana' },
        { name: 'Boutique' },
        { name: 'Micro' },
    ];
    const existingRoomClasses = await prisma.roomClass.findMany();
    if (existingRoomClasses.length === 0) {
        await prisma.roomClass.createMany({
            data: roomClasses,
            skipDuplicates: true,
        });
    }
    console.log('✅ Классы номеров загружены!');
}
//# sourceMappingURL=room-classes.seed.js.map