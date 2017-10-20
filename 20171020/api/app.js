var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./db');
var users = require('./routes/users');
var goods = require('./routes/goods');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//拦截所有的路由
app.use((req, res, next) => {
  console.log("url:"+req.originalUrl);
  //如果已经登录或者登录接口或者首页商品列表接口
  if (req.cookies.userId || req.originalUrl === '/users/login' || req.originalUrl.indexOf('/goods/list') > -1) {
    next();
  } else {
    return res.json({
      status: "10001",
      msg: "当前未登录",
      result: ''
    });
  }
});
app.use('/users', users);
app.use('/goods', goods);
module.exports = app;
