var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var articleSchema = new Schema({
  art_id: Number,
  name: String,
  stock: Number,
});

module.exports = mongoose.model('Article', articleSchema);
