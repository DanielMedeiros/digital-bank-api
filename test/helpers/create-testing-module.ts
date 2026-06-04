import { PrismaService } from '@/shared/database/prisma/prisma.service';
import { Test } from '@nestjs/testing';

export async function createTestingModule(service: any, prismaMock: any) {
  return Test.createTestingModule({
    providers: [
      service,
      {
        provide: PrismaService,
        useValue: prismaMock,
      },
    ],
  }).compile();
}
