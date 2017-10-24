/**
 * Created by Danny on 2015/9/29 14:50.
 */
var mongoose = require('mongoose');

//schema
var studentSchema = new mongoose.Schema({
    "sid"  : Number,
    "name" : String,
    "age" : Number,
    "sex" : String,
    "Kechengs" : [Number]   //存放课程的kid
});
//索引
studentSchema.index({ "sid": 1});

//model
var Student = mongoose.model("Student",studentSchema);

module.exports = Student;