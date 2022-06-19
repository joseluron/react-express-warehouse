const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, contain_articles } = req.body;

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

router.post('/bulk', async (req, res) => {
  try {
    const { products } = req.body;

    if (!products) {
      return res.status(400).json({ error: 'Products not provided' });
    }

    return await Product.collection.insertMany(products, (err, products) => {
      if (err) {
        return res
          .status(400)
          .json({ error: 'The products could not be created' });
      }
      return res.json({ message: 'Products created successfully', products });
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

router.get('/available', async (req, res) => {
  try {
    const products = await Product.find().populate('contain_articles.art_id');

    if (!products) {
      return res.status(400).json({ error: 'No products available' });
    }

    const availableProducts = products
      .map(product => {
        for (let articleDefinition of product.contain_articles) {
          const articleStock = parseInt(articleDefinition.art_id.stock);
          const neededArticleStock = parseInt(articleDefinition.amount_of);

          if (neededArticleStock > articleStock) return null;
        }

        return product;
      })
      .filter(product => product !== null);

    return res.json({ availableProducts });
  } catch {
    return res
      .status(404)
      .json({ error: 'Error while fetching avalable products' });
  }
});

router.get('/product_id/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;

    if (!product_id) {
      return res.status(400).json({ error: 'No product id provided' });
    }

    const product = await Product.findById(product_id).populate(
      'contain_articles.art_id',
    );

    if (!product) {
      return res
        .status(400)
        .json({ error: 'A product with that id does not exist' });
    }

    return res.json({ product });
  } catch {
    return res
      .status(404)
      .json({ error: 'Error while fetching a single product' });
  }
});

router.patch('/product_id/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;

    if (!product_id) {
      return res.status(400).json({ error: 'No product id provided' });
    }

    const product = await Product.findById(product_id).populate(
      'contain_articles.art_id',
    );

    if (!product) {
      return res
        .status(400)
        .json({ error: 'A product with that id does not exist' });
    }

    const { name, contain_articles } = req.body;

    if (name) {
      product.name = name;
    }
    if (contain_articles) {
      product.contain_articles = contain_articles;
    }

    await product.save();

    return res.json({
      message: `Product ${product._id} updated successfully`,
      product,
    });
  } catch {
    return res.status(404).json({ error: 'Error while updating a product' });
  }
});

router.delete('/product_id/:product_id', async (req, res) => {
  try {
    const { product_id } = req.params;

    if (!product_id) {
      return res.status(400).json({ error: 'No product id provided' });
    }

    await Product.deleteOne({ product_id });

    res.json({ message: 'Product deleted successfully' });
  } catch {
    res.status(404).json({ error: 'Error while deleting a product' });
  }
});

module.exports = router;
