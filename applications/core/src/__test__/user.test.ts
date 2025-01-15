import 'dotenv/config';
import request from 'supertest';
import dbClient from '@packages/database';

import app from '../app';

describe('users', () => {
  it('should return 200', async () => {
    expect(process.env.DB_CLIENT).toBe('mock');
  });
  it('should return 200', async () => {
    expect(dbClient).toBeDefined();
  });

  describe('database', () => {
    it('should get all users', async () => {
      const users = await dbClient.findUsers();
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