import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';
import { UserModule } from '../src/user/user.module';
import { PrismaService } from '../src/db/prisma.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UserModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/user', () => {
    it('01 - GET: "/"', () => {
      return request(app.getHttpServer())
        .get('/user')
        .expect(200)
        .expect([
          { id: 1, email: 'robert@email.com', name: 'Robert' },
          { id: 2, email: 'gabriel@email.com', name: 'Robert' },
        ]);
    });

    it('02 - GET: "/:id"', () => {
      return request(app.getHttpServer())
        .get('/user/1')
        .expect(200)
        .expect({ id: 1, email: 'robert@email.com', name: 'Robert' });
    });
  });
});
