let http = require('http');
let fs = require('fs');

let server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url == '/') {
    fs.readFile('./02-client.html', (err, data) => {
      res.end(data);
    })
  }
});

let io = require('socket.io')(server);
io.on('connection', socket => {
  console.log('1 client connected');
  //监听事件
  //2.
  socket.on('tiwen', msg => {
    console.log('客户端发送过来的消息是'+msg);
    //向当前客户端提交事件
    //3.
    socket.emit('return', "你好啊");
  });
});

server.listen(3000, '192.168.80.3');
