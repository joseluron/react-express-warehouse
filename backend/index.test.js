const request = require('supertest');

const { makeApp } = require('./app');
const { connect } = require('./db');

const Article = require('./models/Article')

describe('Api', () => {
  let app, connection;

  beforeAll(async () => {
    connection = await connect();
    app = makeApp();
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('Articles', () => {
    afterEach(async () => {
      await Article.collection.drop();
    });
    
    const MOCK_ARTICLE = {
      art_id: 1,
      name: 'Test Article',
      stock: 1234,
    };

    it('Creates an article', async () => {
      const res = await request(app).post('/articles').send(MOCK_ARTICLE);

      expect(res.body.message).toEqual(
        `Article ${MOCK_ARTICLE.art_id} created successfully`,
      );
    });
  });
});
