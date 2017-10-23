/**
 * Created by Danny on 2015/9/25 9:16.
 */
var express = require("express");
var app = express();
var MongoClient = require('mongodb').MongoClient;


app.get("/",function(req,res){
    //url就是数据库的地址。/表示数据库
    //假如数据库不存在，没有关系，程序会帮你自动创建一个数据库
    var url = 'mongodb://localhost:27017/haha';
    //连接数据库
    MongoClient.connect(url, function(err, db) {
        //回调函数表示连接成功做的事情，db参数就是连接上的数据库实体
        if(err){
            console.log("数据库连接失败");
            return;
        }
        console.log("数据库连接成功");
        //插入数据，集合如果不存在，也没有关系，程序会帮你创建
        db.collection('student').insertOne({
            "name" : "哈哈",
            "age" : parseInt(Math.random() * 100 + 10)
        }, function(err, result) {
            if(err){
                console.log("插入失败");
                return;
            }
            //插入之后做的事情，result表示插入结果。
            //console.log(result);
            res.send(result);
            db.close();
        });
    });
});

app.listen(3000);