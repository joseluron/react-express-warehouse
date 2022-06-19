const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cors = require('cors');

const articlesRoutes = require('./routes/articles');

const makeApp = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride());
  app.use(cors());

  app.get('/', async (req, res) => {
    await res.send('Welcome to react-express-warehouse');
  });
  
  app.use('/articles', articlesRoutes);

  return app;
};

module.exports = {
  makeApp,
};
