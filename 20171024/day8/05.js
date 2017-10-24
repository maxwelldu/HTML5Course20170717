/**
 * Created by Danny on 2015/9/29 10:18.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/xuanke');

var db = mongoose.connection;
db.once('open', function (callback) {
    console.log("数据库成功打开");
});

//学生
var studentSchema = new mongoose.Schema({
    "name" : String,
    "age" : Number,
    "sex" : String
});
//实例方法，涨一岁
studentSchema.methods.zhangyisui = function(){
    this.age++;
    this.save();
}

var Student = mongoose.model("Student",studentSchema);

//课程。
var kechengSchema = new mongoose.Schema({
    "name" : String,
    "info" : String,
    "student" : [studentSchema]
});
//添加学生
kechengSchema.methods.tianjiaxuesheng = function(studentObj,callback){
    this.student.push(studentObj);
    this.save(function(){
        callback();
    });
}

kechengSchema.methods.zhaoxuesheng = function(num,callback){

    Student.findOne({"name":this.student[num].name},function(err,result){
        callback(err,result);
    });
}

var Kecheng = mongoose.model("Kecheng",kechengSchema);

//实例化几个学生
//var xiaoming = new Student({"name":"小明","age":12,"sex":"男"});
//xiaoming.save();

//var shuxue = new Kecheng({
//    "name" : "数学课",
//    "info" : "学数学的"
//});
//////
//shuxue.tianjiaxuesheng(xiaoming,function(){
//    console.log("添加成功");
//});

////寻找学生小明
//Student.findOne({"name":"小明"},function(err,student){
//    student.zhangyisui();
//});
//
//////通过课程找学生
Kecheng.findOne({"name":"数学课"},function(err,kecheng){
    kecheng.zhaoxuesheng(0,function(err,result){
        console.log(result);
    });
});

