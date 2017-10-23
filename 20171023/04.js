var express  = require('express');
var cookieParser = require('cookie-parser');
 
var app = express();
//使用cookie必须要使用cookie-parser中间件
app.use(cookieParser());

app.get("/",function(req,res){
	res.send("猜你喜欢" + req.cookies.mudidi);
});

//查询一个地方的攻略，URL语法： http://127.0.0.1/gonglue?mididi=北京
//此时北京就能记录在cookie中
app.get("/gonglue",function(req,res){
	//得到get请求，用户查询的目的地
	var mudidi = req.query.mudidi;
	//记录用户喜好
	//先读取用户的喜好，然后把新的数据push进入数组，然后设置新的cookie
	var mudidiarry = req.cookies.mudidi || [];
	mudidiarry.push(mudidi);
	//maxAge在Express中以毫秒为单位
	res.cookie("mudidi",mudidiarry,{maxAge: 900000, httpOnly: true});
	res.send(mudidi + "旅游攻略");
});

app.listen(3000);