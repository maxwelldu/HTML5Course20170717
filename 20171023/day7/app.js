/**
 * Created by Danny on 2015/9/28 16:45.
 */

//定义了一个模型，学生模型，“学生类”
var Student = require("./models/Student.js");
////实例化了一个学生类
/*
var xiaoming = new Student({"name":"小明","age":12,"sex":"男"});
//保存这个学生类
xiaoming.save(function(){
   console.log("存储成功");
});
*/

//用类来创建一个对象（工厂）
/*
Student.create({"name":"小红","age":13,"sex":"女"},function(error){
   console.log("保存成功");
})
*/
//
/*
Student.zhaoren("小明",function(err,result){
    console.log(result);
});
*/
Student.xiugai({"name":"小明"},{$set : {"age":30}},{},function(){
    console.log("改年龄成功");
});
