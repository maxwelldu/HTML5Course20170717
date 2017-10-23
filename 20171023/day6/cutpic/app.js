/**
 * Created by Danny on 2015/9/26 14:50.
 */
var express = require("express");
var app = express();
var fs = require("fs");
var gm = require("gm");

app.set("view engine","ejs");
app.use(express.static("./public"));

app.get("/",function(req,res,next){
    res.render("index");
});

app.get("/docut",function(req,res,next){
    //这个页面接收几个GET请求参数
    //文件名、w、h、x、y
    var filename = req.query.filename;
    var w = req.query.w;
    var h = req.query.h;
    var x = req.query.x;
    var y = req.query.y;

    gm("./picture/danny.jpg")
        .crop(w,h,x,y)
        .resize(100,100,"!")
        .write("./picture/danny2.jpg",function(err){
        if(err){
            res.send("-1");
            return;
        }
        res.send("1");
    });
});

app.listen(3000);