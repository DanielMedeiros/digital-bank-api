import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { randomUUID } from 'crypto';
import { initializeTestApp, cleanDatabase } from '../setup';

describe('Auth Integration', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const setup = await initializeTestApp();
    app = setup.app;
  });

  beforeEach(async () => {
    await cleanDatabase();
  });

  it('should login successfully', async () => {
    const uniqueId = randomUUID();

    const userRes = await request(app.getHttpServer())
      .post('/api/v1/users')
      .send({
        name: 'John',
        email: `john-${uniqueId}@email.com`,
        password: '123456',
      });
    expect(userRes.status).toBe(201);

    const response = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        email: `john-${uniqueId}@email.com`,
        password: '123456',
      });

    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
  });
});
