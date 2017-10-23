var express = require("express");
var app = express();
var db = require("./model/db.js");
var session = require("express-session");

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.set("view engine","ejs");


app.get("/",function(req,res){
    if(req.session.login == "1"){
        res.send("欢迎" + req.session.username);
    }else{
        res.send("没有成功登陆");
    }
});

app.get("/login",function(req,res){
	res.render("denglu");
});

app.get("/checklogin",function(req,res){
    var tianxiedeusername = req.query.userName;
    var tianxiedepassword = req.query.userPwd;
    //根据用户填写的姓名，去数据库里面找这个文档，读取密码。
    //如果读取的密码，和填写的密码一样，登陆成功了；
    //如果读取的密码，和填写的密码不一样，登陆失败
    //如果根本没有找到这个记录，那么就说明用户名填写错了
    db.find("users",{"userName":tianxiedeusername},function(err,result){
      console.log(result);
        if(result.length == 0){
            res.send("你的登录名写错了，没有这个注册用户");
            return;
        }
        var shujukuzhongdepassword = result[0].userPwd;
        console.log(shujukuzhongdepassword);
        console.log(tianxiedepassword);
        if(shujukuzhongdepassword == tianxiedepassword){
            req.session.login = "1";
            req.session.username = result[0].userName;
            res.send("成功登陆！你是" + result[0].userName);
        }else{
            res.send("密码错误！");
        }
    })
});

app.listen(3000);
