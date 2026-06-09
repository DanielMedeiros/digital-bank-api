import * as request from 'supertest';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { randomUUID } from 'crypto';
import { cleanDatabase } from '../helpers/database-cleanup';

describe('Digital Bank API (e2e)', () => {
  let app: INestApplication;

  // Aumenta o timeout global para este conjunto de testes (30 segundos)
  jest.setTimeout(30000);

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    // Configuração idêntica ao main.ts para garantir que as rotas /api/v1 funcionem
    app.setGlobalPrefix('api');
    app.enableVersioning({
      type: VersioningType.URI,
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: false,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );

    await app.init();
  });

  beforeEach(async () => {
    await cleanDatabase();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should perform a full banking flow (register, deposit, transfer, statement)', async () => {
    const uniqueId = randomUUID().substring(0, 8);
    const emailA = `user-a-${uniqueId}@email.com`;
    const emailB = `user-b-${uniqueId}@email.com`;
    const password = 'password123'; // Senha um pouco mais longa para evitar regras de minLength

    // 1. Criar e logar com Usuário A
    await request(app.getHttpServer())
      .post('/api/v1/users')
      .send({
        name: 'User A',
        email: emailA,
        password: password,
      })
      .expect((res) => {
        if (res.status !== 201) console.error('Erro no Registro A:', res.body);
      })
      .expect(201);

    const loginA = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        email: emailA,
        password: password,
      })
      .expect(200);

    const tokenA = loginA.body.accessToken;
    expect(tokenA).toBeDefined();

    // 2. Criar e logar com Usuário B (necessário para pegar o tokenB)
    await request(app.getHttpServer())
      .post('/api/v1/users')
      .send({
        name: 'User B',
        email: emailB,
        password: password,
      })
      .expect((res) => {
        if (res.status !== 201) console.error('Erro no Registro B:', res.body);
      })
      .expect(201);

    const loginB = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        email: emailB,
        password: password,
      })
      .expect(200);

    const tokenB = loginB.body.accessToken;
    expect(tokenB).toBeDefined();

    // 3. Obter número da conta do Usuário B
    const accountB = await request(app.getHttpServer())
      .get('/api/v1/accounts/me')
      .set('Authorization', `Bearer ${tokenB}`)
      .expect(200);

    const destinationAccountNumber = accountB.body.accountNumber;

    // 4. Depósito para Usuário A
    await request(app.getHttpServer())
      .post('/api/v1/accounts/deposit')
      .set('Authorization', `Bearer ${tokenA}`)
      .send({ amount: 1000 })
      .expect(201);

    // 5. Transferência do Usuário A para o Usuário B
    await request(app.getHttpServer())
      .post('/api/v1/transactions/transfer')
      .set('Authorization', `Bearer ${tokenA}`)
      .set('idempotency-key', `e2e-transfer-${uniqueId}`)
      .send({
        destinationAccountNumber,
        amount: 300,
      })
      .expect(201);

    // 6. Validar saldos finais
    const accountA = await request(app.getHttpServer())
      .get('/api/v1/accounts/me')
      .set('Authorization', `Bearer ${tokenA}`);
    expect(Number(accountA.body.balance)).toBe(700);

    const accountBUpdated = await request(app.getHttpServer())
      .get('/api/v1/accounts/me')
      .set('Authorization', `Bearer ${tokenB}`);
    expect(Number(accountBUpdated.body.balance)).toBe(300);

    // 7. Validar extrato
    const statement = await request(app.getHttpServer())
      .get('/api/v1/statements')
      .set('Authorization', `Bearer ${tokenA}`);

    expect(statement.status).toBe(200);
    expect(Array.isArray(statement.body)).toBe(true);
    expect(statement.body.length).toBeGreaterThan(0);
  });
});
