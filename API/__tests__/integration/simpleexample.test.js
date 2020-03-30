/* eslint-disable no-undef */
import request from 'supertest';
import app from '../../src/app';

describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const user = await request(app)
      .post('/users')
      .send({
        name: 'jest',
        email: 'jest@jest.com',
        password: 'jest123',
      });

    console.log(user.body);
    expect(user.statusCode).toEqual(200);

    const session = await request(app)
      .post('/sessions')
      .send({
        email: 'jest@jest.com',
        password: 'jest123',
      });

    console.log(session.body.token);
    expect(session.statusCode).toEqual(200);
    expect(session.body).toHaveProperty('token');
  });
});
