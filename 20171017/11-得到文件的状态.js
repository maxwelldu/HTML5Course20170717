let http = require('http');
let fs = require('fs');

http.createServer((req, res) => {
  if (req.url === '/favicon.ico') return;
  //stat检测状态
  fs.stat('./canvas-svg', function(err, data){
    //检测这个路径，是不是一个目录
    console.log(data.isDirectory());
  });
}).listen(3000, '192.168.80.250');
