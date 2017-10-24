var express = require('express');
var router = express.Router();
var Questions = require('../model/Questions');

router.get('/', (req, res) => {
  Questions.find((err, docs) => {
    if (err) {
      throw err;
    }
    res.render('questions/index', {result: docs});
  });
});
//显示提问页面
router.get('/create', (req, res) => {
  res.render('questions/create');
});
//处理提问
router.post('/create', (req, res) => {
  let {title, content} = req.body;
  //:TODO 可以判断问题不能重复
  let author = req.session.username;
  let created_at = new Date();
  Questions.create({title,author,content,created_at}, (err,doc) => {
    if (err) {
      res.locals.message = common.errorMessage('提问发生异常');
      return res.render('questions/create');
    }
    if (!doc) {
      res.locals.message = common.errorMessage('提问失败');
      return res.render('/questions/create');
    }
    res.locals.message = '提问成功';
    return res.redirect('/questions');
  });
})

module.exports = router;
