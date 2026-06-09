import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { randomUUID } from 'crypto';
import { initializeTestApp, cleanDatabase } from '../setup';

describe('Accounts Integration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const setup = await initializeTestApp();
    app = setup.app;
  });

  beforeEach(async () => {
    await cleanDatabase();
  });

  describe('POST /api/v1/accounts/deposit', () => {
    it('should deposit successfully', async () => {
      const uniqueId = randomUUID();

      const userRes = await request(app.getHttpServer())
        .post('/api/v1/users')
        .send({
          name: 'John',
          email: `john-${uniqueId}@email.com`,
          password: '123456',
        });
      expect(userRes.status).toBe(201);

      const loginRes = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: `john-${uniqueId}@email.com`,
          password: '123456',
        });
      expect(loginRes.status).toBe(200);

      const response = await request(app.getHttpServer())
        .post('/api/v1/accounts/deposit')
        .set('Authorization', `Bearer ${loginRes.body.accessToken}`)
        .send({ amount: 500 });

      expect(response.status).toBe(201);
      expect(response.body.balance).toBeDefined();
    });
  });

  describe('POST /api/v1/accounts/withdraw', () => {
    it('should withdraw successfully with sufficient balance', async () => {
      const uniqueId = randomUUID();

      const userRes = await request(app.getHttpServer())
        .post('/api/v1/users')
        .send({
          name: 'John',
          email: `john-${uniqueId}@email.com`,
          password: '123456',
        });
      expect(userRes.status).toBe(201);

      const loginRes = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: `john-${uniqueId}@email.com`,
          password: '123456',
        });
      expect(loginRes.status).toBe(200);

      const depositRes = await request(app.getHttpServer())
        .post('/api/v1/accounts/deposit')
        .set('Authorization', `Bearer ${loginRes.body.accessToken}`)
        .send({ amount: 500 });
      expect(depositRes.status).toBe(201);

      const response = await request(app.getHttpServer())
        .post('/api/v1/accounts/withdraw')
        .set('Authorization', `Bearer ${loginRes.body.accessToken}`)
        .send({ amount: 100 });

      expect(response.status).toBe(201);
      expect(response.body.balance).toBeDefined();
    });
  });

  describe('GET /api/v1/accounts/me', () => {
    it('should get account details', async () => {
      const uniqueId = randomUUID();

      const userRes = await request(app.getHttpServer())
        .post('/api/v1/users')
        .send({
          name: 'John',
          email: `john-${uniqueId}@email.com`,
          password: '123456',
        });
      expect(userRes.status).toBe(201);

      const loginRes = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: `john-${uniqueId}@email.com`,
          password: '123456',
        });
      expect(loginRes.status).toBe(200);

      const response = await request(app.getHttpServer())
        .get('/api/v1/accounts/me')
        .set('Authorization', `Bearer ${loginRes.body.accessToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('balance');
    });
  });
});
