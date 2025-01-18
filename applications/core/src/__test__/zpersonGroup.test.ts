// import 'dotenv/config';
import request from 'supertest';
import prisma from '../utils/prisma';
import app from '../app';
import { verifyToken } from '../utils/auth';
import user from './fixtures/user/user.json';
import user2 from './fixtures/user/user2.json';

describe('personGroups', () => {
  it('should return 200', async () => {
    expect(prisma).toBeDefined();
  });

  describe('api', () => {
    describe('not authenticated', () => {
      it('should not get all personGroups', async () => {
        const response = await request(app).get('/api/groups');
        expect(response.status).toBe(403);
      });

      it('should not get personGroup by id', async () => {
        const response = await request(app).get('/api/groups/1');
        expect(response.status).toBe(403);
      });

      it('should not be able to register a personGroup', async () => {
        const response = await request(app).post('/api/groups/register').send({
          email: user2.email,
          fullName: user2.name,
          password: 'testpassword'
        });
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message');
      });

      it('should not be able to update a personGroup', async () => {
        const response = await request(app).put('/api/groups/1').send({
          email: user2.email,
          fullName: user2.name,
          password: 'testpassword'
        });
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message');
      });

      it('should not be able to add members to a personGroup', async () => {
        const response = await request(app).put('/api/groups/1/members').send({
          email: user2.email,
          fullName: user2.name,
          password: 'testpassword'
        });
        expect(response.status).toBe(403);
        expect(response.body).toHaveProperty('message');
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

      it('should be able to register a personGroup', async () => {
        const response = await request(app).post('/api/groups/register').send({
          name: user2.name,
          password: 'testpassword'
        }).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
      });

      it('should be able to update a personGroup', async () => {
        const response = await request(app).put('/api/groups/1').send({
          name: user2.name,
          password: 'testpassword2'
        }).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
      });

      it('should be able to add a list of members a personGroup', async () => {
        const response = await request(app).put('/api/groups/1/members').send({
          emails: [user.email]
        }).set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
      });

      it('should get all personGroups', async () => {
        const response = await request(app).get('/api/groups').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
      });

      it('should not get personGroups by id', async () => {
        const response = await request(app).get('/api/groups/1').set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
      });
    });
  });
});