"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedServices = seedServices;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedServices() {
    console.log('🏨 Загружаем услуги отеля...');
    const serviceGroups = [
        { name: 'Parking and Transport' },
        { name: 'Hotel Amenities' },
        { name: 'Family Entertainment' },
        { name: 'Food and Restaurant' },
        { name: 'Business' },
        { name: 'Health and Spa' },
    ];
    const existingGroups = await prisma.systemServiceGroup.findMany();
    if (existingGroups.length === 0) {
        await prisma.systemServiceGroup.createMany({
            data: serviceGroups,
            skipDuplicates: true,
        });
    }
    const groups = await prisma.systemServiceGroup.findMany();
    const serviceTypes = [
        { name: 'Basic', systemServiceGroupId: groups[0]?.id || 1 },
        { name: 'Premium', systemServiceGroupId: groups[0]?.id || 1 },
        { name: 'Luxury', systemServiceGroupId: groups[1]?.id || 2 },
        { name: 'Free', systemServiceGroupId: groups[2]?.id || 3 },
        { name: 'Paid', systemServiceGroupId: groups[3]?.id || 4 },
    ];
    const existingTypes = await prisma.systemServiceType.findMany();
    if (existingTypes.length === 0) {
        await prisma.systemServiceType.createMany({
            data: serviceTypes,
            skipDuplicates: true,
        });
    }
    const types = await prisma.systemServiceType.findMany();
    const basicType = types.find(t => t.name === 'Basic') || types[0];
    const premiumType = types.find(t => t.name === 'Premium') || types[1];
    const freeType = types.find(t => t.name === 'Free') || types[3];
    const paidType = types.find(t => t.name === 'Paid') || types[4];
    const services = [
        { name: 'Free parking', systemServiceTypeId: freeType.id },
        { name: 'Paid parking', systemServiceTypeId: paidType.id },
        { name: 'Valet parking', systemServiceTypeId: premiumType.id },
        { name: 'Electric vehicle charging station', systemServiceTypeId: basicType.id },
        { name: 'Garage', systemServiceTypeId: basicType.id },
        { name: 'Covered parking', systemServiceTypeId: basicType.id },
        { name: 'Airport shuttle', systemServiceTypeId: basicType.id },
        { name: 'Free airport shuttle', systemServiceTypeId: freeType.id },
        { name: 'Paid airport shuttle', systemServiceTypeId: paidType.id },
        { name: 'Taxi service', systemServiceTypeId: paidType.id },
        { name: 'Car rental', systemServiceTypeId: paidType.id },
        { name: 'Bicycle rental', systemServiceTypeId: paidType.id },
        { name: 'Free WiFi', systemServiceTypeId: freeType.id },
        { name: 'Paid WiFi', systemServiceTypeId: paidType.id },
        { name: 'High-speed internet', systemServiceTypeId: premiumType.id },
        { name: '24-hour front desk', systemServiceTypeId: basicType.id },
        { name: 'Concierge service', systemServiceTypeId: premiumType.id },
        { name: 'Luggage storage', systemServiceTypeId: freeType.id },
        { name: 'Bell service', systemServiceTypeId: basicType.id },
        { name: 'Room service', systemServiceTypeId: premiumType.id },
        { name: 'Kids club', systemServiceTypeId: basicType.id },
        { name: 'Playground', systemServiceTypeId: freeType.id },
        { name: 'Game room', systemServiceTypeId: basicType.id },
        { name: 'Pool', systemServiceTypeId: basicType.id },
        { name: 'Water slides', systemServiceTypeId: premiumType.id },
        { name: 'Restaurant', systemServiceTypeId: basicType.id },
        { name: 'Bar', systemServiceTypeId: basicType.id },
        { name: 'Breakfast included', systemServiceTypeId: freeType.id },
        { name: 'All inclusive', systemServiceTypeId: premiumType.id },
        { name: 'Kitchen', systemServiceTypeId: basicType.id },
        { name: 'Business center', systemServiceTypeId: basicType.id },
        { name: 'Meeting rooms', systemServiceTypeId: premiumType.id },
        { name: 'Conference facilities', systemServiceTypeId: premiumType.id },
        { name: 'Printing services', systemServiceTypeId: paidType.id },
        { name: 'Spa', systemServiceTypeId: premiumType.id },
        { name: 'Fitness center', systemServiceTypeId: basicType.id },
        { name: 'Sauna', systemServiceTypeId: premiumType.id },
        { name: 'Massage', systemServiceTypeId: premiumType.id },
        { name: 'Wellness center', systemServiceTypeId: premiumType.id },
    ];
    const existingServices = await prisma.systemService.findMany();
    if (existingServices.length === 0) {
        await prisma.systemService.createMany({
            data: services,
            skipDuplicates: true,
        });
    }
    console.log('✅ Услуги отеля загружены!');
}
//# sourceMappingURL=services.seed.js.map