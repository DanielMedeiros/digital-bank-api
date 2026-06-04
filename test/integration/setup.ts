import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/shared/database/prisma/prisma.service';

let app: INestApplication;
let prismaService: PrismaService;

export async function initializeTestApp() {
  if (app) return { app, prismaService };

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  await app.init();

  prismaService = moduleFixture.get<PrismaService>(PrismaService);

  return { app, prismaService };
}

export async function cleanupTestApp() {
  if (app) {
    await app.close();
    app = null;
  }
}

export async function cleanDatabase() {
  if (!prismaService) {
    const { prismaService: ps } = await initializeTestApp();
    prismaService = ps;
  }

  try {
    await prismaService.transaction.deleteMany();
    await prismaService.idempotencyKey.deleteMany();
    await prismaService.account.deleteMany();
    await prismaService.user.deleteMany();
  } catch (error) {
    console.error('Error cleaning database:', error);
  }
}

export function getApp() {
  if (!app) {
    throw new Error('Test app not initialized. Call initializeTestApp first.');
  }
  return app;
}

export function getPrismaService() {
  if (!prismaService) {
    throw new Error(
      'Prisma service not initialized. Call initializeTestApp first.',
    );
  }
  return prismaService;
}
