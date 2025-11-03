// Prisma Client singleton instance
// Naudojame singleton pattern, kad išvengtume per daug database connections development aplinkoje
import { PrismaClient } from '@prisma/client';

// Declare global Prisma variable to prevent multiple instances in development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Sukuriame Prisma instance arba naudojame global instance
export const prisma = globalForPrisma.prisma || new PrismaClient();

// Development aplinkoje pridedame Prisma instance į global object
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;

