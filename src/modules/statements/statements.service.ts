import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '@/shared/database/prisma/prisma.service';

@Injectable()
export class StatementsService {
  constructor(private readonly prisma: PrismaService) {}

  async getStatement(userId: string, startDate?: string, endDate?: string) {
    const account = await this.prisma.account.findUnique({
      where: {
        userId,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return this.prisma.transaction.findMany({
      where: {
        OR: [
          {
            fromAccountId: account.id,
          },
          {
            toAccountId: account.id,
          },
        ],

        createdAt: {
          gte: startDate ? new Date(startDate) : undefined,

          lte: endDate ? new Date(endDate) : undefined,
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
