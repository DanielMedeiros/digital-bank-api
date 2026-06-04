import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../../../src/modules/auth/auth.service';
import { PrismaService } from '../../../src/shared/database/prisma/prisma.service';

describe('AuthService', () => {
  let service: AuthService;
  let prismaMock: any;
  let jwtMock: any;

  beforeEach(async () => {
    prismaMock = {
      user: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    jwtMock = {
      sign: jest.fn().mockReturnValue('mock-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
        {
          provide: JwtService,
          useValue: jwtMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should login successfully', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: '1',
      email: 'john@email.com',
      password: await bcrypt.hash('123456', 10),
    });

    const result = await service.login({
      email: 'john@email.com',
      password: '123456',
    });

    expect(result.accessToken).toBeDefined();
  });

  it('should throw unauthorized error', async () => {
    prismaMock.user.findUnique.mockResolvedValue({
      id: '1',
      email: 'john@email.com',
      password: await bcrypt.hash('123456', 10),
    });

    await expect(
      service.login({
        email: 'john@email.com',
        password: 'wrong-password',
      }),
    ).rejects.toThrow();
  });
});
