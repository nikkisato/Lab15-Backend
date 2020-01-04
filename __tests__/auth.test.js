require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const User = require('../lib/models/User');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can signup a user with username and password', () => {
    return request(app)
      .post('/api/v1/auth/signup')
      .send({ username: 'test@test.com', password: 'password' })
      .then(res => {
        expect(res.header['set-cookie'][0]).toEqual(expect.stringContaining('session='));
        expect(res.body).toEqual({
          _id: expect.any(String),
          username: 'test@test.com',
          __v: 0
        });
      });
  });

  it('can login a user with username and password', async() => {
    const user = await User.create({
      username: 'test@test.com',
      password: 'password'
    });

    return request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'test@test.com', password: 'password' })
      .then(res => {
        expect(res.header['set-cookie'][0]).toEqual(expect.stringContaining('session='));
        expect(res.body).toEqual({
          _id: user.id,
          username: 'test@test.com',
          __v: 0
        });
      });
  });


  it('fails to login a user with a bad username', async() => {
    await User.create({
      username: 'test@test.com',
      password: 'password'
    });
    return request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'Fail', password: 'password' })
      .then(res => {
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({
          status: 401,
          message: 'Invalid Email/Password'
        });
      });
  });

  it('fails to login a user with a bad password', async() => {
    await User.create({
      username: 'test@test.com',
      password: 'password'
    });

    return request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'test@test.com', password: 'notright' })
      .then(res => {
        expect(res.status).toEqual(401);
        expect(res.body).toEqual({
          status: 401,
          message: 'Invalid Email/Password'
        });
      });
  });

  it('can verify if a user is logged in', async() => {
    const user = await User.create({
      username: 'test@test.com',
      password: 'password'
    });

    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({ username: 'test@test.com', password: 'password' });

    return agent
      .get('/api/v1/auth/verify')
      .then(res => {
        expect(res.body).toEqual({
          _id: user.id,
          username: 'test@test.com',
          __v: 0
        });
      });
  });

});
