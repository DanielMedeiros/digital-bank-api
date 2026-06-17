import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, TransactionType } from '@prisma/client';
import { PrismaService } from '@/shared/database/prisma/prisma.service';
import { depositCounter, withdrawCounter } from '../metrics/metrics.service';

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

    await this.prisma.transaction.create({
      data: {
        type: TransactionType.DEPOSIT,

        toAccountId: account.id,

        amount: new Prisma.Decimal(amount),
      },
    });

    depositCounter.inc();

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

    await this.prisma.transaction.create({
      data: {
        type: TransactionType.WITHDRAW,

        fromAccountId: account.id,

        amount: new Prisma.Decimal(amount),
      },
    });

    withdrawCounter.inc();

    return updatedAccount;
  }
}
