let http = require('http');
let fs = require('fs');

http.createServer((req, res) => {
    //给用户一个模拟一个五位数的id
    var userid = Number.parseInt(Math.random() * 89999) + 10000;
    console.log('欢迎' + userid);
    res.writeHead(200, {"content-type": "text/html;charset=utf-8"});
    fs.readFile('./a.html', function(err, data){
      if (err) {
        throw err;
      }
      console.log(userid + '读取完毕');
      res.end(data);
    });
}).listen(3000, '192.168.80.250');
