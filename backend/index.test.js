const request = require('supertest');

const { makeApp } = require('./app');

describe('Api', () => {
  let app;

  beforeAll(async () => {
    app = makeApp();
  });

  describe('Hello World!', () => {
    it('Show welcome message', async () => {
      const res = await request(app).get('/');

      expect(res.text).toEqual('Welcome to react-express-warehouse');
    });
  });
});
