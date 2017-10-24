var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var common = require('./vendor/common');

var index = require('./routes/index');
var users = require('./routes/users');
var questions = require('./routes/questions');

var app = express();
app.use(session({
    secret: 'sessiontest',//与cookieParser中的一致
    resave: true,
    saveUninitialized:true
}));
app.use(function(req,res,next){
    res.locals.username = req.session.username;   // 从session 获取 user对象
    var err = req.session.error;   //获取错误信息
    delete req.session.error;
    res.locals.message = "";   // 展示的信息 message
    if(err){
        res.locals.message = '<div class="alert alert-danger" style="margin-bottom:20px;color:red;">'+err+'</div>';
    }
    next();  //中间件传递
});
app.use((req, res, next) => {
  if (req.url === '/users/login' || req.url === '/users/register' || req.url === '/questions') {
    next();
  } else {
    if (!req.session.username) {
      //:TODO 无效
      res.locals.message = common.errorMessage('当前操作需要需要');
      return res.redirect('/users/login');
    } else {
      next();
    }
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/questions', questions);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
