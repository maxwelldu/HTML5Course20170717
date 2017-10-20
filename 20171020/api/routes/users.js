var express = require('express');
var router = express.Router();
let User = require('../models/user');

//1.登录接口
router.post('/login', (req, res, next) => {
  //获取到用户名和密码
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  //去数据库的用户表查询用户名和密码匹配的用户是否存在
  User.findOne(param, (err, doc) => {
    //如果不存在则提示用户不存在
    if (err) {
      return res.json({
        status: "1",
        msg: err.message
      })
    }
    if (!doc) {
      return res.json({
        status: "1",
        msg: "用户名或密码错误"
      })
    }
    //如果存在给客户端种下一个userId, userName Cookie的值, 并且返回用户登录成功
    res.cookie("userId", doc.userId, {
      maxAge: 1000*60*60
    });
    res.cookie("userName", doc.userName, {
      maxAge: 1000*60*60
    });
    return res.json({
      status: "0",
      msg: '',
      result: {
        userName: doc.userName
      }
    });
  });
});

//2.退出
router.post('/logout', (req, res, next) => {
  //清空cookie
  res.cookie('userId', '', {
    maxAge: -1
  });
  return res.json({
    status: "0",
    msg: '',
    result: ''
  });
});

//3.检查用户是否已登录
router.get('/checkLogin', (req, res, next) => {
  if (req.cookies.userId) {
    return res.json({
      status: "0",
      msg: '',
      result: req.cookies.userName || ''
    });
  }
  return res.json({
    status: "1",
    msg: "未登录",
    result: ''
  });
});

module.exports = router;
