/**
 * Created by Danny on 2015/9/28 16:44.
 */
//引包
var mongoose = require('mongoose');
//创建数据库连接
var db      = mongoose.createConnection('mongodb://127.0.0.1:27017/day7');
//监听open事件
db.once('open', function (callback) {
    console.log("数据库成功连接");
});
//向外暴露这个db对象
module.exports = db;
