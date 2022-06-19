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
      art_id: '1',
      name: 'Test Article',
      stock: '1234',
    };
    const MOCK_ARTICLE_2 = {
      art_id: '2',
      name: 'Test Article',
      stock: '1234',
    };

    const MOCK_INVENTORY = {
      inventory: [MOCK_ARTICLE, MOCK_ARTICLE_2],
    };

    it('Creates an article', async () => {
      const res = await request(app).post('/articles').send(MOCK_ARTICLE);

      expect(res.body.message).toEqual(
        `Article ${MOCK_ARTICLE.art_id} created successfully`,
      );
    });

    it('Creates multiple articles', async () => {
      const res = await request(app)
        .post('/articles/bulk')
        .send(MOCK_INVENTORY);

      expect(res.body.message).toEqual('Articles created successfully');
    });

    it('Gets all articles', async () => {
      await request(app).post('/articles').send(MOCK_ARTICLE);
      await request(app).post('/articles').send(MOCK_ARTICLE_2);

      const res = await request(app).get('/articles');

      expect(res.body.articles.length).toBe(2);
    });

    it('Get a single article', async () => {
      await request(app).post('/articles').send(MOCK_ARTICLE);

      const res = await request(app).get(`/articles/art_id/1`);

      expect(res.body.article._id).toEqual(MOCK_ARTICLE.art_id);
    });

    it('Updates an article', async () => {
      await request(app).post('/articles').send(MOCK_ARTICLE);

      const res = await request(app)
        .patch(`/articles/art_id/1`)
        .send({ stock: '12345' });

      expect(res.body.article.stock).toEqual('12345');
    });

    it('Deletes an article', async () => {
      await request(app).post('/articles').send(MOCK_ARTICLE);

      const res = await request(app).delete(`/articles/art_id/1`);

      expect(res.body.message).toEqual(
        `Article ${MOCK_ARTICLE.art_id} deleted successfully`,
      );
    });
  });
});
