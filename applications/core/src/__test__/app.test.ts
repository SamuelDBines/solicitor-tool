import 'dotenv/config';
import request from 'supertest';

import app from '../app';
import { verifyPassword, hashPassword } from '../utils/bcrypt';
import { signToken, verifyToken } from '../utils/auth';

describe('app', () => {

  it('should return 200', async () => {
    expect(process.env.DB_CLIENT).toBe('mock');
  });

  it('should return 404', async () => {

    const response = await request(app).get('/not-found');

    expect(response.status).toBe(404);
  });
  it('should return 200', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);
  });

  describe('password encryption test', () => {
    it('should encrypt the password ', async () => {
      const password = 'test';
      const hashedPassword = await hashPassword(password);
      expect(password).not.toEqual(hashedPassword);
    });

    it('should decrypt the password ', async () => {
      const password = 'test';
      const hashedPassword = await hashPassword(password);
      expect(password).not.toEqual(hashedPassword);
      const isMatch = await verifyPassword(password, hashedPassword);
      expect(isMatch).toBeTruthy();
    });

    it('should not match the password ', async () => {
      const password = 'test';
      const fakeHash = 'fakeHash';
      const isMatch = await verifyPassword(password, fakeHash);
      expect(isMatch).toBeFalsy();
    });
  });

  describe('token should sign and verify', () => {
    it('should sign a token ', async () => {
      const payload = {
        id: '1',
        email: 'bob@test.com'
      };
      const signedToken = await signToken(payload);
      expect(signedToken).toBeDefined();
      expect(typeof signedToken).toEqual('string');
    });

    it('verify a signed token', async () => {
      const payload = {
        id: '1',
        email: 'bob@test.com'
      };
      const signedToken = await signToken(payload);
      expect(signedToken).toBeDefined();
      const isMatch = await verifyToken(`Bearer: ${signedToken}`);
      expect(isMatch).toBeTruthy();
    });

  });
});