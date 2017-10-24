let mongoose = require('mongoose');
let db = require('../config/db');

let UserSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String},
  sex: {type: String},
  avatar: {type: String},
  last_login_at: {type: String}
});

module.exports = db.model('User', UserSchema);
