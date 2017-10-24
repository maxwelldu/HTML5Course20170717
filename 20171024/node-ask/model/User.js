let mongoose = require('mongoose');
let db = require('../config/db');

let UserSchema = new mongoose.Schema({
  username: {type: String},
  password: {type: String},
  sex: {type: String},
  avatar: {type: String},
  last_login_at: {type: String}
});
//根据用户名查看用户
UserSchema.statics.findUserByUsername = function(username, cb) {
  console.log(this);
  this.model('User').findOne({username}, cb);
}

module.exports = db.model('User', UserSchema);
