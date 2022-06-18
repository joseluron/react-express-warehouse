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
      art_id,
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

module.exports = router;
