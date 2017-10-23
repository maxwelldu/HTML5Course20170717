/**
 * Created by Danny on 2015/9/26 9:46.
 */
var express = require("express");
var app = express();
var formidable = require('formidable');
var db = require("./model/db.js");

var md5 = require("./model/md5.js");

app.set("view engine","ejs");

app.use(express.static("./public"));

//注册页面
app.get("/regist",function(res,res,next){
    res.render("regist");
});

//登陆页面
app.get("/login",function(res,res,next){
    res.render("login");
});

//执行注册
app.get("/doregist",function(req,res,next){
    var dengluming = req.query.dengluming;
    var mima = req.query.mima;
    //加密
    mima = md5(md5(mima).substr(4,7) + md5(mima));

    //把用户名和密码存入数据库
    db.insertOne("users",{
        "dengluming" : dengluming,
        "mima" : mima
    },function(err,result){
        if(err){
            res.send("-1");
            return;
        }
        res.send("1");
    })
});

app.post("/dologin",function(req,res,next){
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
        var dengluming = fields.dengluming;
        var mima = fields.mima;
        mima = md5(md5(mima).substr(4,7) + md5(mima));

        //检索数据库，按登录名检索数据库，查看密码是否匹配
        db.find("users",{"dengluming":dengluming},function(err,result){
           if(result.length == 0){
               res.send("-2");  //-2没有这个人
               return;
           }
            var shujukuzhongdemima = result[0].mima;
            //要对用户这次输入的密码，进行相同的加密操作。然后与
            //数据库中的密码进行比对
            if(mima == shujukuzhongdemima){
                res.send("1");  //成功
            }else{
                res.send("-1"); //密码不匹配
            }
        });
    });

    return;
});

app.listen(3000);


