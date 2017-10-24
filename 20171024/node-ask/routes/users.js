var express = require('express');
var router = express.Router();
var User = require('../model/User');
var common = require('../vendor/common');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//注册页面
router.get('/register', (req, res) => {
  res.render('user/register');
});
//注册逻辑
router.post('/register', (req, res) => {
  //解构赋值, 只要左边的结构和右边的一致
  let {username, password} = req.body;
  password = common.encryption(password);
  //通常需要进行校验，：TODO
  //先看一下数据库有没有这个用户，如果有要提示已经有了，没有则进行注册，注册有成功和失败
  User.findOne({username}, (err, doc) => {
    if (err) {
      res.locals.message = common.errorMessage('查找用户异常');
      return res.render('user/register');
    }
    //如果有表示当前用户名已经注册
    if (doc) {
      res.locals.message = common.errorMessage('当前用户名已注册');
      return res.render('user/register');
    }
    //注册用户
    User.create({username, password}, (err, doc) => {
      if (err) {
        res.locals.message = common.errorMessage('注册用户异常');
        return res.render('user/register');
      }
      if (doc) {
        res.locals.message = '注册成功';
        return res.render('user/register');
      }
      res.locals.message = common.errorMessage('注册失败');
      return res.render('user/register');
    });
  });
});
//登录的页面
router.get('/login', (req, res) => {
  res.render('user/login');
});
//登录的逻辑
router.post('/login', (req, res) => {
  let {username, password} = req.body;
  //查找用户是否存在
  User.findOne({username}, (err, doc) => {
    if (err) {
      res.locals.message = common.errorMessage('查找用户异常');
      return res.render('user/login');
    }
    //如果没有查到结果则返回用户名或密码错误
    if (!doc) {
      res.locals.message = common.errorMessage('用户名或密码错误');
      return res.render('user/login');
    }
    if (doc.password !== common.encryption(password)) {
      res.locals.message = common.errorMessage('密码错误');
      return res.render('user/login');
    }
    req.session.username = username;
    res.locals.username = username;//往本地变量存一份，是全局的
    res.locals.message = '登录成功';
    return res.render('user/login');
  });
});
//退出
router.get('/logout', (req, res) => {
  req.session.username = '';
  res.locals.username = '';
  return res.redirect('/');
});

module.exports = router;
