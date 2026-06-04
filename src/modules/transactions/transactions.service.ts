import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Prisma, TransactionType } from '@prisma/client';
import { PrismaService } from '@/shared/database/prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async transfer(
    userId: string,
    destinationAccountNumber: string,
    amount: number,
    idempotencyKey: string,
  ) {
    if (!idempotencyKey) {
      throw new BadRequestException('Idempotency-Key header is required');
    }

    const existingKey = await this.prisma.idempotencyKey.findUnique({
      where: {
        key: idempotencyKey,
      },
    });

    if (existingKey) {
      return existingKey.response;
    }

    const transaction = await this.prisma.$transaction(async (tx) => {
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

      const transactionRecord = await tx.transaction.create({
        data: {
          type: TransactionType.TRANSFER,
          fromAccountId: originAccount.id,
          toAccountId: destinationAccount.id,
          amount: new Prisma.Decimal(amount),
        },
      });

      const responseData = {
        message: 'Transfer completed successfully',
        transactionId: transactionRecord.id,
        amount: Number(transactionRecord.amount).toFixed(2),
      };

      await tx.idempotencyKey.create({
        data: {
          key: idempotencyKey,
          response: responseData as any,
        },
      });

      return responseData;
    });

    return transaction;
  }
}
