import 'dotenv/config';
import request from 'supertest';

import app from '../app';

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
});