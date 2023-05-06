const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');

require('dotenv').config();

/**
 * Connecting to the database before each test
 */

beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/**
 * Closing database connection after each test
 */
afterEach(async () => {
  await mongoose.connection.close();
});

describe('GET /tests', () => {
  test('should return status 200', async () => {
    const res = await request(app).get('/tests');
    expect(res.statusCode).toBe(200);
  });

  test('should return all tests', async () => {
    const res = await request(app).get('/tests');
    expect(res.body).toBeTruthy();
  });
});

describe('POST /tests', () => {
  describe('when inputs correct', () => {
    const req = {
      string: 'abc',
      pattern: '.*',
    };

    let res;

    afterEach(async () => {
      await request(app).delete(`/tests/${res.body._id}`);
    });

    test('should return status 201', async () => {
      res = await request(app).post('/tests').send(req);
      expect(res.statusCode).toBe(201);
    });

    test('should return created test', async () => {
      res = await request(app).post('/tests').send(req);
      expect(res.body.string).toBe(req.string);
      expect(res.body.pattern).toBe(req.pattern);
      expect(res.body).toHaveProperty('result');
      expect(res.body).toHaveProperty('_id');
    });
  });

  test('when string is missing should not create a test', async () => {
    const res = await request(app).post('/tests').send({
      pattern: '.*',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('parameters can be only strings');
  });

  test('when pattern is missing should not create a test', async () => {
    const res = await request(app).post('/tests').send({
      string: 'ac',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('parameters can be only strings');
  });

  test('when input is empty should not create a test', async () => {
    const res = await request(app).post('/tests').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('parameters can be only strings');
  });

  test('when string has not only english letters should not create a test', async () => {
    const res = await request(app).post('/tests').send({
      string: 'ac12',
      pattern: '.',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('string contains only lowercase English letters');
  });

  test(`when pattern has not only english letters, '.', '*' should not create a test`, async () => {
    const res = await request(app).post('/tests').send({
      string: 'abc',
      pattern: '12',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe(`pattern contains only lowercase English letters, '.' and '*'`);
  });

  test('when inputs has not only lowercase letters should not create a test', async () => {
    const res = await request(app).post('/tests').send({
      string: 'aA',
      pattern: 'A',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('parameters contain only lowercase English letters');
  });

  test('when inputs has wrong type should not create a test', async () => {
    const res = await request(app).post('/tests').send({
      string: 123,
      pattern: true,
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('parameters can be only strings');
  });

  test('when inputs has length < 1 should not create a test', async () => {
    const res = await request(app).post('/tests').send({
      string: '',
      pattern: '',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('parametres can have length only from 1 to 20');
  });

  test('when inputs has length > 20 should not create a test', async () => {
    const res = await request(app).post('/tests').send({
      string: 'aaaaaaaaaaaaaaaaaaaaaaaaa',
      pattern: 'aaaaaaaaaaaaaaaaaaaaaaa',
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('parametres can have length only from 1 to 20');
  });
});
