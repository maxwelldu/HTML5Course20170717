let mongoose = require('mongoose');
let db = require('../config/db');

let Schema = new mongoose.Schema({
  title: {type: String},
  content: {type: String},
  created_at: {type: String},
  author: {type: String},
  up: {type: String},
  down: {type: String},
  comments: [
    {
      author: String,
      created_at: String,
      content: String,
      vote: String
    }
  ]
});
module.exports = db.model('Questions', Schema);
