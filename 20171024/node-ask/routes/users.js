var express = require('express');
var router = express.Router();
var User = require('../model/User');
var md5 = require('../vendor/md5');

/* GET user listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/register', (req, res) => {
  res.render('user/register', {code: 0, msg:''});
});
router.post('/register', (req, res) => {
  // let username = req.body.username;
  // let psasword = req.body.password;
  //解构赋值, 只要左边的结构和右边的一致
  let {username, password} = req.body;
  password = md5(md5(password + 'ask'));
  console.log(username, password);
  //通常需要进行校验，：TODO
  //先看一下数据库有没有这个用户，如果有要提示已经有了，没有则进行注册，注册有成功和失败
  User.findUserByUsername(username, (err, doc) => {
    if (err) {
      return res.render('user/register', {
        code: 1,
        msg: '查找用户异常'
      });
    }
    //如果有表示当前用户名已经注册
    if (doc) {
      return res.render('user/register', {
        code: 1,
        msg: '当前用户名已注册'
      });
    }
    User.create({username, password}, (err, doc) => {
      if (err) {
        return res.render('user/register', {
          code: 1,
          msg: '注册用户异常'
        });
      }
      if (doc) {
        return res.render('user/register', {
          code: 0,
          msg: '注册成功'
        });
      }
      return res.render('user/register', {
        code: 1,
        msg: '注册失败'
      });
    });
  });

})

module.exports = router;
