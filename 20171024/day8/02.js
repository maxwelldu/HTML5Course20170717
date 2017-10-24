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
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs:  Number
    }
});

blogSchema.methods.showInfo = function(){
    console.log(this.title);
}

var Blog = mongoose.model('Blog', blogSchema);

var blog = new Blog({
    "title" : "博客测试",
    "author" : "考拉"
});

//blog.save();
blog.showInfo();