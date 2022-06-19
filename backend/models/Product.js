const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const containArticlesSchema = new Schema({
  art_id: { type: Schema.Types.String, ref: 'Article' },
  amount_of: String,
});

const productSchema = new Schema({
  name: String,
  contain_articles: [containArticlesSchema],
});

module.exports = mongoose.model('Product', productSchema);
