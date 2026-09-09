import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }
let prisma: PrismaClient;
globalForPrisma.prisma !== undefined ? prisma = globalForPrisma.prisma : (globalForPrisma.prisma = new PrismaClient({adapter}), prisma = globalForPrisma.prisma)
export { prisma }