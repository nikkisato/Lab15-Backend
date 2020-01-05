require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Note = require('../lib/models/Note');
const User = require('../lib/models/User');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });
  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let note;

  beforeEach(async() => {
    note = await Note
      .create({
        title: 'Japan',
        text:'Sakura Blossom'
      });
   
  });
  
  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a note', async() => {
    await User.create({ 
      email: 'corgi@land.com', 
      password: 'password' });
    
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({ 
        email: 'corgi@land.com', 
        password: 'password' });
    return agent
      .post('/api/v1/notes')
      .send({
        title: 'Japan',
        text:'Sakura Blossom'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Japan',
          text:'Sakura Blossom',
          __v: 0
        });
      });
  });


  it('finds all notes', async() => {
    return request(app)
      .get('/api/v1/notes')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          title: 'Japan',
          text:'Sakura Blossom',
          __v: 0
        }]);
      });
  });

  it('finds a single note by id', async() => {
    return request(app)
      .get(`/api/v1/notes/${note._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Japan',
          text:'Sakura Blossom',
          __v: 0
        });
      });
  });

  it('updates a note by id', async() => {
    await User.create({ 
      email: 'corgi@corgi.com', 
      password: 'password' });
    
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({ email: 'corgi@corgi.com', password: 'password' });

    return agent
      .patch(`/api/v1/books/${note._id}`)
      .send({ title: 'Portland' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Portland',
          text:'Sakura Blossom',
          __v: 0
        });
      });

  });

  it('deletes a note by id', async() => {
    await User.create({ 
      email: 'delete@delete.com', 
      password: 'password' });
    
    const agent = request.agent(app);

    await agent
      .post('/api/v1/auth/login')
      .send({ email: 'delete@delete.com', password: 'password' });

    return agent
      .patch(`/api/v1/notes/${note._id}`)
      .send({ title: 'Portland' })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          title: 'Portland',
          text:'Sakura Blossom',
          __v: 0
        });
      });
  });

});
