"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedServices = seedServices;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function seedServices() {
    console.log('🏨 Загружаем услуги отеля...');
    const serviceTypes = [
        { name: 'Basic' },
        { name: 'Premium' },
        { name: 'Luxury' },
        { name: 'Free' },
        { name: 'Paid' },
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
    const services = [
        { name: 'Free parking', systemServiceGroupId: groups[0]?.id || 1, systemServiceTypeId: freeType?.id || 1 },
        { name: 'Paid parking', systemServiceGroupId: groups[0]?.id || 1, systemServiceTypeId: paidType?.id || 1 },
        { name: 'Valet parking', systemServiceGroupId: groups[0]?.id || 1, systemServiceTypeId: premiumType?.id || 1 },
        { name: 'Electric vehicle charging station', systemServiceGroupId: groups[0]?.id || 1, systemServiceTypeId: basicType?.id || 1 },
        { name: 'Garage', systemServiceGroupId: groups[0]?.id || 1, systemServiceTypeId: basicType?.id || 1 },
        { name: 'Covered parking', systemServiceGroupId: groups[0]?.id || 1, systemServiceTypeId: basicType?.id || 1 },
        { name: 'Airport shuttle', systemServiceGroupId: groups[0]?.id || 1, systemServiceTypeId: basicType?.id || 1 },
        { name: 'Free airport shuttle', systemServiceGroupId: groups[0]?.id || 1, systemServiceTypeId: freeType?.id || 1 },
        { name: 'Paid airport shuttle', systemServiceGroupId: groups[0]?.id || 1, systemServiceTypeId: paidType?.id || 1 },
        { name: 'Taxi service', systemServiceGroupId: groups[0]?.id || 1, systemServiceTypeId: paidType?.id || 1 },
        { name: 'Car rental', systemServiceGroupId: groups[0]?.id || 1, systemServiceTypeId: paidType?.id || 1 },
        { name: 'Bicycle rental', systemServiceGroupId: groups[0]?.id || 1, systemServiceTypeId: paidType?.id || 1 },
        { name: 'Free WiFi', systemServiceGroupId: groups[1]?.id || 2, systemServiceTypeId: freeType?.id || 1 },
        { name: 'Paid WiFi', systemServiceGroupId: groups[1]?.id || 2, systemServiceTypeId: paidType?.id || 1 },
        { name: 'High-speed internet', systemServiceGroupId: groups[1]?.id || 2, systemServiceTypeId: premiumType?.id || 1 },
        { name: '24-hour front desk', systemServiceGroupId: groups[1]?.id || 2, systemServiceTypeId: basicType?.id || 1 },
        { name: 'Concierge service', systemServiceGroupId: groups[1]?.id || 2, systemServiceTypeId: premiumType?.id || 1 },
        { name: 'Luggage storage', systemServiceGroupId: groups[1]?.id || 2, systemServiceTypeId: freeType?.id || 1 },
        { name: 'Bell service', systemServiceGroupId: groups[1]?.id || 2, systemServiceTypeId: basicType?.id || 1 },
        { name: 'Room service', systemServiceGroupId: groups[1]?.id || 2, systemServiceTypeId: premiumType?.id || 1 },
        { name: 'Kids club', systemServiceGroupId: groups[2]?.id || 3, systemServiceTypeId: basicType?.id || 1 },
        { name: 'Playground', systemServiceGroupId: groups[2]?.id || 3, systemServiceTypeId: freeType?.id || 1 },
        { name: 'Game room', systemServiceGroupId: groups[2]?.id || 3, systemServiceTypeId: basicType?.id || 1 },
        { name: 'Pool', systemServiceGroupId: groups[2]?.id || 3, systemServiceTypeId: basicType?.id || 1 },
        { name: 'Water slides', systemServiceGroupId: groups[2]?.id || 3, systemServiceTypeId: premiumType?.id || 1 },
        { name: 'Restaurant', systemServiceGroupId: groups[3]?.id || 4, systemServiceTypeId: basicType?.id || 1 },
        { name: 'Bar', systemServiceGroupId: groups[3]?.id || 4, systemServiceTypeId: basicType?.id || 1 },
        { name: 'Breakfast included', systemServiceGroupId: groups[3]?.id || 4, systemServiceTypeId: freeType?.id || 1 },
        { name: 'All inclusive', systemServiceGroupId: groups[3]?.id || 4, systemServiceTypeId: premiumType?.id || 1 },
        { name: 'Kitchen', systemServiceGroupId: groups[3]?.id || 4, systemServiceTypeId: basicType?.id || 1 },
        { name: 'Business center', systemServiceGroupId: groups[4]?.id || 5, systemServiceTypeId: basicType?.id || 1 },
        { name: 'Meeting rooms', systemServiceGroupId: groups[4]?.id || 5, systemServiceTypeId: premiumType?.id || 1 },
        { name: 'Conference facilities', systemServiceGroupId: groups[4]?.id || 5, systemServiceTypeId: premiumType?.id || 1 },
        { name: 'Printing services', systemServiceGroupId: groups[4]?.id || 5, systemServiceTypeId: paidType?.id || 1 },
        { name: 'Spa', systemServiceGroupId: groups[5]?.id || 6, systemServiceTypeId: premiumType?.id || 1 },
        { name: 'Fitness center', systemServiceGroupId: groups[5]?.id || 6, systemServiceTypeId: basicType?.id || 1 },
        { name: 'Sauna', systemServiceGroupId: groups[5]?.id || 6, systemServiceTypeId: premiumType?.id || 1 },
        { name: 'Massage', systemServiceGroupId: groups[5]?.id || 6, systemServiceTypeId: premiumType?.id || 1 },
        {
            name: 'Wellness center',
            systemServiceGroupId: groups[5]?.id || 6,
            systemServiceTypeId: premiumType?.id || 1,
        },
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