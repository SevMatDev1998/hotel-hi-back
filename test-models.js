const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

console.log('Available models:');
Object.keys(prisma).forEach(key => {
  if (typeof prisma[key] === 'object' && prisma[key] !== null && !key.startsWith('$')) {
    console.log(key);
  }
});
