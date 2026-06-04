import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { randomUUID } from 'crypto';
import { initializeTestApp, cleanDatabase } from '../setup';
import { PrismaService } from '../../../src/shared/database/prisma/prisma.service';

describe('Transactions Integration', () => {
  let app: INestApplication;
  let prismaService: PrismaService;

  beforeAll(async () => {
    const setup = await initializeTestApp();
    app = setup.app;
    prismaService = setup.prismaService;
  });

  beforeEach(async () => {
    await cleanDatabase();
  });

  describe('POST /api/v1/transactions/transfer', () => {
    it('should transfer successfully', async () => {
      const uniqueId = randomUUID();

      // Create sender
      const userSenderRes = await request(app.getHttpServer())
        .post('/api/v1/users')
        .send({
          name: 'Sender',
          email: `sender-${uniqueId}@email.com`,
          password: '123456',
        });
      expect(userSenderRes.status).toBe(201);

      // Create receiver
      const userReceiverRes = await request(app.getHttpServer())
        .post('/api/v1/users')
        .send({
          name: 'Receiver',
          email: `receiver-${uniqueId}@email.com`,
          password: '123456',
        });
      expect(userReceiverRes.status).toBe(201);

      // Login sender
      const senderLogin = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: `sender-${uniqueId}@email.com`,
          password: '123456',
        });
      expect(senderLogin.status).toBe(200);

      // Login receiver
      const receiverLogin = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: `receiver-${uniqueId}@email.com`,
          password: '123456',
        });
      expect(receiverLogin.status).toBe(200);

      // Get receiver account number
      const receiverAccount = await request(app.getHttpServer())
        .get('/api/v1/accounts/me')
        .set('Authorization', `Bearer ${receiverLogin.body.accessToken}`);
      expect(receiverAccount.status).toBe(200);

      // Deposit to sender
      const depositRes = await request(app.getHttpServer())
        .post('/api/v1/accounts/deposit')
        .set('Authorization', `Bearer ${senderLogin.body.accessToken}`)
        .send({ amount: 1000 });
      expect(depositRes.status).toBe(201);

      // Transfer
      const response = await request(app.getHttpServer())
        .post('/api/v1/transactions/transfer')
        .set('Authorization', `Bearer ${senderLogin.body.accessToken}`)
        .set('idempotency-key', `key-${uniqueId}`)
        .send({
          destinationAccountNumber: receiverAccount.body.accountNumber,
          amount: 100,
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('transactionId');
    });
  });
});
