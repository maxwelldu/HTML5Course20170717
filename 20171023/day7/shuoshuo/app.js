var express = require("express");
var app = express();
var router = require("./router/router.js");

var session = require('express-session');

//使用session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//模板引擎
app.set("view engine","ejs");
//静态页面
app.use(express.static("./public"));
app.use("/avatar",express.static("./avatar"));
//路由表
app.get("/",router.showIndex);              //显示首页
app.get("/regist",router.showRegist);       //显示注册页面
app.post("/doregist",router.doRegist);      //执行注册，Ajax服务
app.get("/login",router.showLogin);         //显示登陆页面
app.post("/dologin",router.doLogin);        //执行登录，Ajax服务
app.get('/logout', router.doLogout);        //执行退出
app.get("/setavatar",router.showSetavatar); //设置头像页面
app.post("/dosetavatar",router.dosetavatar);//执行设置头像，Ajax服务
app.get("/cut",router.showcut);             //剪裁头像页面
app.post("/post",router.doPost);            //发表说说
app.get("/docut",router.docut);             //执行剪裁
app.get("/getAllShuoshuo",router.getAllShuoshuo);  //列出所有说说Ajax服务
app.get("/getuserinfo",router.getuserinfo);  //列出所有说说Ajax服务
app.get("/getshuoshuoamount",router.getshuoshuoamount);  //说说总数
app.get("/user/:user",router.showUser);  //显示用户所有说说
app.get("/post/:oid",router.showUser);  //显示用户所有说说
app.get("/userlist",router.showuserlist);  //显示所有用户列表


app.listen(3000);
