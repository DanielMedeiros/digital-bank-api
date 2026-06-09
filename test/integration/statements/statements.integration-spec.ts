import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { randomUUID } from 'crypto';
import { initializeTestApp, cleanDatabase } from '../setup';

describe('Statements Integration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const setup = await initializeTestApp();
    app = setup.app;
  });

  beforeEach(async () => {
    await cleanDatabase();
  });

  describe('GET /api/v1/statements', () => {
    it('should return statements for user', async () => {
      const uniqueId = randomUUID();

      // Create user
      const userRes = await request(app.getHttpServer())
        .post('/api/v1/users')
        .send({
          name: 'John',
          email: `john-${uniqueId}@email.com`,
          password: '123456',
        });
      expect(userRes.status).toBe(201);

      // Login user
      const loginRes = await request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: `john-${uniqueId}@email.com`,
          password: '123456',
        });
      expect(loginRes.status).toBe(200);

      // Deposit
      const depositRes = await request(app.getHttpServer())
        .post('/api/v1/accounts/deposit')
        .set('Authorization', `Bearer ${loginRes.body.accessToken}`)
        .send({ amount: 500 });
      expect(depositRes.status).toBe(201);

      // Get statements
      const response = await request(app.getHttpServer())
        .get('/api/v1/statements')
        .set('Authorization', `Bearer ${loginRes.body.accessToken}`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThanOrEqual(1);
    });

    it('should require authentication', async () => {
      const response = await request(app.getHttpServer()).get(
        '/api/v1/statements',
      );

      expect(response.status).toBe(401);
    });
  });
});
