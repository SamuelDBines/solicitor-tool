// import 'dotenv/config';
import request from 'supertest';
import prisma from '../utils/prisma';
import user from './fixtures/user/user.json';
import user2 from './fixtures/user/user2.json';
import app from '../app';

describe('users', () => {
  it('should return 200', async () => {
    expect(process.env.DB_CLIENT).toBe('mock');
  });
  it('should return 200', async () => {
    expect(prisma).toBeDefined();
  });

  describe('database', () => {
    it('should create a user', async () => {
      const userCreate = await prisma.user.create({
        data: {
          ...user,
        }
      });
      expect(userCreate).toBeTruthy();
      expect(typeof userCreate).toBe('object');
      expect(userCreate).toHaveProperty('id');
      expect(userCreate.id).toBeDefined();
      expect(userCreate).toMatchObject(user);
    });

    it('should get all users', async () => {
      const users = await prisma.user.findMany();
      expect(users).toHaveLength(1);
    });
  });

  describe('api', () => {
    it('should get all users on /api/users', async () => {
      const response = await request(app).get('/api/users');
      expect(response.status).toBe(200);
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

    it('should be able not be able to register an existing user', async () => {
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
      expect(response.body).toHaveProperty('attempts', 1);
    });
  });
});