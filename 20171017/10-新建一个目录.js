let http = require('http');
let fs = require('fs');
console.log(fs);

http.createServer((req, res) => {
  if (req.url === '/favicon.ico') return;
  var userid = Number.parseInt(Math.random() * 89999) + 10000;
  fs.mkdir('./test/'+userid);
  res.end('创建成功');
}).listen(3000, '192.168.80.250');
