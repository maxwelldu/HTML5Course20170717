/**
 * Created by Danny on 2015/9/29 14:50.
 */
var mongoose = require('mongoose');

//schema
var kechengSchema = new mongoose.Schema({
    "kid"  : Number,
    "name" : String,
    "students" : [Number]       //这个数组存放的是学生的sid
});
//索引
kechengSchema.index({ "kid": 1});

kechengSchema.statics.tianjiaxuesheng = function(kidarray,sid,callback){
    for(var i = 0 ; i < kidarray.length ; i++){
        Kecheng.update({"kid":kidarray[i]},{$push :{"students":sid}},function(){
            console.log("课程添加报名学生成功");
        })
    }
}

//model
var Kecheng = mongoose.model("Kecheng",kechengSchema);

module.exports = Kecheng;