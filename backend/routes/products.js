const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, contain_articles } = req.body;

    console.log('Body: ', { name, contain_articles });

    const errors = [
      !name ? 'Product name not provided' : null,
      !contain_articles
        ? 'Articles contained in the product not provided'
        : null,
    ].filter(x => x !== null);

    if (errors.length) {
      return res.status(400).json({ errors });
    }

    const product = new Product({
      name,
      contain_articles,
    });
    await product.save();

    return res.json({
      message: `Product ${product.name} created successfully`,
      product,
    });
  } catch {
    return res
      .status(404)
      .json({ error: 'Error while creating multiple products' });
  }
});

router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('contain_articles.art_id');

    if (!products.length) {
      return res.status(400).json({ error: 'No products found' });
    }

    return res.json({ products });
  } catch {
    return res.status(404).json({ error: 'Error while fetching all products' });
  }
});

module.exports = router;
