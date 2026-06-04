import { Test, TestingModule } from '@nestjs/testing';
import { AccountsService } from '../../../src/modules/accounts/accounts.service';
import { PrismaService } from '../../../src/shared/database/prisma/prisma.service';

describe('AccountsService', () => {
  let service: AccountsService;
  let prismaMock: any;

  beforeEach(async () => {
    prismaMock = {
      account: {
        findUnique: jest.fn(),
        update: jest.fn(),
        create: jest.fn(),
      },
      user: {
        findUnique: jest.fn(),
      },
      transaction: {
        create: jest.fn(),
        findMany: jest.fn(),
      },
      idempotencyKey: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<AccountsService>(AccountsService);
  });

  it('should deposit money', async () => {
    prismaMock.account.findUnique.mockResolvedValue({
      id: 'account-1',
      balance: 100,
    });

    prismaMock.account.update.mockResolvedValue({
      id: 'account-1',
      balance: 200,
    });

    const result = await service.deposit('user-id', 100);

    expect(result.balance).toBe(200);
  });

  it('should throw if account not found', async () => {
    prismaMock.account.findUnique.mockResolvedValue(null);

    await expect(service.deposit('user-id', 100)).rejects.toThrow();
  });

  it('should withdraw money', async () => {
    prismaMock.account.findUnique.mockResolvedValue({
      id: '1',
      balance: 500,
    });

    prismaMock.account.update.mockResolvedValue({
      id: '1',
      balance: 300,
    });

    const result = await service.withdraw('user-id', 200);

    expect(result.balance).toBe(300);
  });

  it('should throw insufficient balance', async () => {
    prismaMock.account.findUnique.mockResolvedValue({
      id: '1',
      balance: 50,
    });

    await expect(service.withdraw('user-id', 100)).rejects.toThrow();
  });
});
