// import 'dotenv/config';
import request from 'supertest';
import prisma from '../utils/prisma';
import app from '../app';
import { verifyToken } from '../utils/auth';
import user from './fixtures/user/user.json';
import user2 from './fixtures/user/user2.json';

describe('users', () => {
  it('should return 200', async () => {
    expect(prisma).toBeDefined();
  });

  describe('api', () => {
    describe('not authenticated', () => {
      it('should get all users', async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(403);
      });

      it('should not get users by id', async () => {
        const response = await request(app).get('/api/users/1');
        expect(response.status).toBe(403);
      });

      it('should be able to register a user', async () => {
        const response = await request(app).post('/api/users/register').send({
          email: user2.email,
          fullName: user2.name,
          password: 'testpassword'
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
      });

      it('should be able to register an another user', async () => {
        const response = await request(app).post('/api/users/register').send({
          email: user.email,
          fullName: user.name,
          password: 'testpassword'
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
      });

      it('should not be able to register an existing user', async () => {
        const response = await request(app).post('/api/users/register').send({
          email: user.email,
          fullName: user.name,
          password: 'testpassword'
        });
        expect(response.status).toBe(409);
        expect(response.body).toHaveProperty('message');
      });

      it('should be able not be able to register a user without name set', async () => {
        const response = await request(app).post('/api/users/register').send({
          email: user.email,
          password: 'testpassword'
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
      });

      it('should be able to login a user', async () => {
        const response = await request(app).post('/api/users/login').send({
          email: user2.email,
          password: 'testpassword'
        });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('token');
      });

      it('should be able to login a user', async () => {
        const response = await request(app).post('/api/users/login').send({
          email: user2.email,
          password: 'testpassword1'
        });
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('attempts');
      });
    });

    describe('authenticated', () => {
      let token: string; // for authentication
      beforeAll(async () => {
        const response = await request(app)
          .post('/api/users/login')
          .send({
            email: user2.email,
            password: 'testpassword'
          });

        token = response.body.token;
        expect(token).toBeDefined();
        const isMatch = await verifyToken(`Bearer: ${token}`);
        expect(isMatch).toBeTruthy();
      });

      it('should get all users', async () => {
        const response = await request(app).get('/api/users').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
      });

      it('should not get users by id', async () => {
        const response = await request(app).get('/api/users/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
      });
    });
  });
});