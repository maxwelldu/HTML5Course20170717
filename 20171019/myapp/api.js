let express = require('express');
let app = express();
// 对网站首页的访问返回 "Hello World!" 字样
//RESTFul API  针对同一个资源使用不同的请求方式：get post put delete; put 和 delete需要服务器端支持
//获取商品列表
app.get('/', function (req, res) {
  res.json({code:0, message:'ok', data:[
    {goods_id: 1, goods_name: 'g1'},
    {goods_id: 2, goods_name: 'g2'},
    {goods_id: 3, goods_name: 'g3'},
    {goods_id: 4, goods_name: 'g4'}
  ]});
});

//添加一个商品
app.post('/', function (req, res) {
  res.json({code: 1, message: 'error'});
});

//更新一个商品
app.put('/', function (req, res) {
  res.send('Got a PUT request at /user');
});

//删除一个商品
app.delete('/', function (req, res) {
  res.send('Got a DELETE request at /user');
});

let server = app.listen(3000, () => {
  let host = server.address().address;
  let port = server.address().port;
  console.log('%s:%s', host, port);
});
