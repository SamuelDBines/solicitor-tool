// import 'dotenv/config';
import request from 'supertest';
import prisma from '../utils/prisma';
import user from './fixtures/user/user.json';
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
  });

});