const request = require('supertest');

const { makeApp } = require('./app');
const { connect } = require('./db');

const Article = require('./models/Article');

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

    it('Gets all articles', async () => {
      await request(app).post('/articles').send(MOCK_ARTICLE);
      await request(app).post('/articles').send(MOCK_ARTICLE);

      const res = await request(app).get('/articles');

      expect(res.body.articles.length).toBe(2);
    });

    it('Get a single article', async () => {
      await request(app).post('/articles').send(MOCK_ARTICLE);

      const res = await request(app).get(`/articles/art_id/1`);

      expect(res.body.article.art_id).toEqual(MOCK_ARTICLE.art_id);
    });
  });
});
