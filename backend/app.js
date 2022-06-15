const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const makeApp = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride());

  app.get('/', async (req, res) => {
    await res.send('Welcome to react-express-warehouse');
  });

  return app;
};

module.exports = {
  makeApp,
};
