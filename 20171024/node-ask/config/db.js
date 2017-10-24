let mongoose = require('mongoose');
let db = mongoose.createConnection('mongodb://127.0.0.1:27017/ask');
db.on('open', cb => {
  console.log('数据库连接成功');
});
db.on('error', cb => {
  console.log('数据库发生错误');
});
module.exports = db;
