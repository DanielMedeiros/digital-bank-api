import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function cleanDatabase() {
  await prisma.transaction.deleteMany();

  await prisma.account.deleteMany();

  await prisma.user.deleteMany();

  await prisma.idempotencyKey.deleteMany();
}
