import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PrismaService } from '@/shared/database/prisma/prisma.service';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  async findByUserId(userId: string) {
    const account = await this.prisma.account.findUnique({
      where: {
        userId,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    return account;
  }

  async deposit(userId: string, amount: number) {
    const account = await this.prisma.account.findUnique({
      where: {
        userId,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const updatedAccount = await this.prisma.account.update({
      where: {
        id: account.id,
      },

      data: {
        balance: {
          increment: new Prisma.Decimal(amount),
        },
      },
    });

    return updatedAccount;
  }

  async withdraw(userId: string, amount: number) {
    const account = await this.prisma.account.findUnique({
      where: {
        userId,
      },
    });

    if (!account) {
      throw new NotFoundException('Account not found');
    }

    const currentBalance = Number(account.balance);

    if (currentBalance < amount) {
      throw new BadRequestException('Insufficient balance');
    }

    const updatedAccount = await this.prisma.account.update({
      where: {
        id: account.id,
      },

      data: {
        balance: {
          decrement: new Prisma.Decimal(amount),
        },
      },
    });

    return updatedAccount;
  }
}
