const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const articleSchema = new Schema({
  _id: String,
  name: String,
  stock: String,
});

module.exports = mongoose.model('Article', articleSchema);
