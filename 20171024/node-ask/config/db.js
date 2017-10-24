let config = require('./config');
let mongoose = require('mongoose');
let db = mongoose.createConnection(config.MONGODB_URL);
db.on('open', cb => {
  console.log('数据库连接成功');
});
db.on('error', cb => {
  console.log('数据库发生错误');
});
module.exports = db;
