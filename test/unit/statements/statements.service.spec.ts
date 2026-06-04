import { Test, TestingModule } from '@nestjs/testing';
import { StatementsService } from '../../../src/modules/statements/statements.service';
import { PrismaService } from '../../../src/shared/database/prisma/prisma.service';

describe('StatementsService', () => {
  let service: StatementsService;
  let prismaMock: any;

  beforeEach(async () => {
    prismaMock = {
      account: {
        findUnique: jest.fn(),
        update: jest.fn(),
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
        StatementsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<StatementsService>(StatementsService);
  });

  it('should return statement', async () => {
    prismaMock.account.findUnique.mockResolvedValue({
      id: 'account-id',
    });

    prismaMock.transaction.findMany.mockResolvedValue([
      {
        id: '1',
        type: 'DEPOSIT',
        amount: 500,
      },
    ]);

    const result = await service.getStatement('user-id');

    expect(result).toHaveLength(1);
  });
});
