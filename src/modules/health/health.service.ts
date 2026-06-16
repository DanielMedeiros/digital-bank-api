import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/shared/database/prisma/prisma.service';

@Injectable()
export class HealthService {
  constructor(private readonly prisma: PrismaService) {}

  getStatus() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }

  async getDatabaseStatus() {
    await this.prisma.$queryRaw`SELECT 1`;

    return {
      status: 'ok',
      database: 'up',
      timestamp: new Date().toISOString(),
    };
  }
}
