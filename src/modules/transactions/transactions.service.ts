import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/shared/database/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async transfer(
    userId: string,
    destinationAccountNumber: string,
    amount: number,
  ) {
    return this.prisma.$transaction(async (tx) => {
      const originAccount = await tx.account.findUnique({
        where: {
          userId,
        },
      });

      if (!originAccount) {
        throw new NotFoundException('Origin account not found');
      }

      const destinationAccount = await tx.account.findUnique({
        where: {
          accountNumber: destinationAccountNumber,
        },
      });

      if (!destinationAccount) {
        throw new NotFoundException('Destination account not found');
      }

      if (originAccount.id === destinationAccount.id) {
        throw new BadRequestException('Cannot transfer to the same account');
      }

      const balance = Number(originAccount.balance);

      if (balance < amount) {
        throw new BadRequestException('Insufficient balance');
      }

      await tx.account.update({
        where: {
          id: originAccount.id,
        },

        data: {
          balance: {
            decrement: new Prisma.Decimal(amount),
          },
        },
      });

      await tx.account.update({
        where: {
          id: destinationAccount.id,
        },

        data: {
          balance: {
            increment: new Prisma.Decimal(amount),
          },
        },
      });

      const transaction = await tx.transaction.create({
        data: {
          fromAccountId: originAccount.id,
          toAccountId: destinationAccount.id,
          amount: new Prisma.Decimal(amount),
        },
      });

      return transaction;
    });
  }
}
