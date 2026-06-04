import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from '../../../src/modules/transactions/transactions.service';
import { PrismaService } from '../../../src/shared/database/prisma/prisma.service';

describe('TransactionsService', () => {
  let service: TransactionsService;
  let prismaMock: any;

  beforeEach(async () => {
    prismaMock = {
      $transaction: jest.fn(),
      transaction: {
        create: jest.fn(),
      },
      idempotencyKey: {
        findUnique: jest.fn(),
      },
      account: {
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should transfer successfully', async () => {
    const mockTransaction = {
      id: 'transaction-1',
      amount: 100,
    };

    prismaMock.idempotencyKey.findUnique.mockResolvedValue(null);

    prismaMock.$transaction.mockImplementation(async (callback) => {
      const result = await callback({
        account: {
          findUnique: jest
            .fn()
            .mockResolvedValueOnce({
              id: 'origin',
              balance: 500,
            })
            .mockResolvedValueOnce({
              id: 'destination',
              balance: 100,
            }),

          update: jest.fn(),
        },

        transaction: {
          create: jest.fn().mockResolvedValue(mockTransaction),
        },

        idempotencyKey: {
          create: jest.fn(),
        },
      });

      return result;
    });

    const result = await service.transfer(
      'user-id',
      '260-123456',
      100,
      'abc-123',
    );

    expect(result).toBeDefined();
    expect((result as any).transactionId).toBe('transaction-1');
    expect((result as any).amount).toBe('100.00');
  });

  it('should throw insufficient balance', async () => {
    prismaMock.idempotencyKey.findUnique.mockResolvedValue(null);

    prismaMock.$transaction.mockImplementation(async (callback) => {
      return callback({
        account: {
          findUnique: jest
            .fn()
            .mockResolvedValueOnce({
              id: 'origin',
              balance: 50,
            })
            .mockResolvedValueOnce({
              id: 'destination',
              balance: 100,
            }),
        },
      });
    });

    await expect(
      service.transfer('user-id', '260-123456', 100, 'abc-123'),
    ).rejects.toThrow();
  });
});
