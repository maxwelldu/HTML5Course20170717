//引包
var mongoose = require('mongoose');
//创建一个数据库连接
mongoose.connect('mongodb://localhost/test');

//创建一个Cat模型。 语法mongosse.model(模型名字，Schema);
//这里省略了一步，就是schema是通过new mongoose.schema({})创建的。
var Cat = mongoose.model('Cat', { name: String , age : Number , sex : String });
//实例化，实例化的时候，new Cat(数值)
var kitty = new Cat({ name: "汤姆"  , "sex" : "公猫"});
//保存
kitty.save(function (err) {
    console.log('meow');
});

//寻找汤姆猫，将它改为8岁。
Cat.find({"name":"汤姆"},function(err,result){
   var xiaomao = result[0]; //xiaomao这个变量是一个Cat的实例。为什么？
                            //因为它是从Cat集合中find出来的，所以find出来之后
                            //就是Cat的一个实例。
    xiaomao.age = 8;
    xiaomao.save();
});