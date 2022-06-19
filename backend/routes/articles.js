const express = require('express');
const Article = require('../models/Article');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { art_id, name, stock } = req.body;

    const errors = [
      !art_id ? 'Article id not provided' : null,
      !name ? 'Article name nor provided' : null,
      !stock ? 'Article stock not provided' : null,
    ].filter(x => x !== null);

    if (errors.length) {
      return res.status(400).json({ errors });
    }

    const article = new Article({
      _id: art_id,
      name,
      stock,
    });
    await article.save();

    return res.json({
      message: `Article ${art_id} created successfully`,
      article,
    });
  } catch {
    return res.status(404).json({ error: 'Error while creating article' });
  }
});

router.post('/bulk', async (req, res) => {
  try {
    const { inventory } = req.body;

    if (!inventory) {
      return res.status(400).json({ error: 'Inventory not provided' });
    }

    const articles = inventory.map(article => {
      return { _id: article.art_id, name: article.name, stock: article.stock };
    });

    return await Article.collection.insertMany(articles, (err, articles) => {
      if (err) {
        return res
          .status(400)
          .json({ error: 'The articles could not be created' });
      }
      return res.json({ message: 'Articles created successfully', articles });
    });
  } catch {
    return res
      .status(404)
      .json({ error: 'Error while creating multiple articles' });
  }
});

router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();

    if (!articles.length) {
      return res.status(400).json({ error: 'No articles found' });
    }

    return res.json({ articles });
  } catch {
    return res.status(404).json({ error: 'Error while fetching all articles' });
  }
});

router.get('/art_id/:art_id', async (req, res) => {
  try {
    const art_id = req.params.art_id;

    if (!art_id) {
      return res.status(400).json({ error: 'No article id provided' });
    }

    const article = await Article.findOne({ art_id });

    if (!article) {
      return res
        .status(400)
        .json({ error: 'An article with that article id does not exist' });
    }

    return res.json({ article });
  } catch {
    return res.status(404).json({ error: 'Error while fetching an article' });
  }
});

router.patch('/art_id/:art_id', async (req, res) => {
  try {
    const articleId = req.params.art_id;

    if (!articleId) {
      return res.status(400).json({ error: 'No article id provided' });
    }

    const { art_id, name, stock } = req.body;

    const article = await Article.findOne({ art_id: articleId });

    if (!article) {
      return res
        .status(400)
        .json({ error: 'An article with that article id does not exist' });
    }

    if (art_id) {
      article.art_id = art_id;
    }
    if (name) {
      article.name = name;
    }
    if (stock) {
      article.stock = stock;
    }

    await article.save();

    return res.json({
      message: `Article ${articleId} updated successfully`,
      article,
    });
  } catch (error) {
    return res.status(404).json({ error: 'Error while updating an article' });
  }
});

router.delete('/art_id/:art_id', async (req, res) => {
  try {
    const art_id = req.params.art_id;

    if (!art_id) {
      return res.status(400).json({ error: 'No article id provided' });
    }

    await Article.deleteOne({ art_id });

    return res.json({ message: `Article ${art_id} deleted successfully` });
  } catch (err) {
    console.log('the error', err);
    return res.status(404).json({ error: 'Error while deleting an article' });
  }
});

module.exports = router;
