/**
 * Created by Danny on 2015/9/22 9:37.
 */
var express = require("express");
var app = express();


//无视大小写，? #
app.get("/AAb",function(req,res){
    res.send("你好");
});

// 冒号
app.get("/student/:id",function(req,res){
    var id = req.params["id"];
    var reg= /^[\d]{6}$/;
    if(reg.test(id)){
        res.send(id);
    }else{
        res.send("请检查格式");
    }
});

//冒号
app.get("/:username/:oid",function(req,res){
    var username = req.params["username"];
    var oid = req.params["oid"];

    res.write(username);
    res.end(oid);
});

app.listen(3000);