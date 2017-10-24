/**
 * Created by Danny on 2015/9/29 10:18.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.once('open', function (callback) {
    console.log("数据库成功打开");
});

//博客的结构
var animalSchema = new mongoose.Schema({
    "name" : String,
    "type" : String
});

animalSchema.methods.zhaotonglei = function(callback){
    this.model('Animal').find({"type":this.type},callback);
}

var Animal = mongoose.model('Animal', animalSchema);

//Animal.create({"name":"汤姆","type":"猫"});
//Animal.create({"name":"咪咪","type":"猫"});
//Animal.create({"name":"小白","type":"狗"});
//Animal.create({"name":"snoopy","type":"狗"});

Animal.findOne({"name":"小白"},function(err,result){
    var dog = result;
    dog.zhaotonglei(function(err,result){
        console.log(result);
    });
});