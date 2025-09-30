import { PrismaClient } from "../../generated/prisma"; // adjust path as needed

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error']});
} else {
  if (!(globalThis as any).prisma) {
    (globalThis as any).prisma = new PrismaClient({log: ['query', 'info', 'warn', 'error']});
  }
  prisma = (globalThis as any).prisma;
}

export default prisma;
