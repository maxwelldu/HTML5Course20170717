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
var blogSchema = new mongoose.Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }]
});

//发表评论
blogSchema.methods.pinglun = function(obj,callback){
    this.comments.push(obj);
    this.save();
}

var Blog = mongoose.model('Blog', blogSchema);

//var blog = new Blog({
//    "title" : "哈哈哈",
//    "author" : "考拉",
//    "body" : "哈哈哈哈"
//});

//寻找一个标题是哈哈哈的博客，然后发表评论
Blog.findOne({"title":"哈哈哈"},function(err,blog){
    if(!blog){
        return;
    }
    blog.pinglun({"body":"再来一个评论","date" : new Date()});
});


