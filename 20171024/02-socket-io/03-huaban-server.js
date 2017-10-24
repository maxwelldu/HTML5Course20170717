let http = require('http');
let fs = require('fs');

let server = http.createServer((req, res) => {
  console.log(req.url);
  if (req.url == '/') {
    fs.readFile('./04-huaban-client.html', (err, data) => {
      res.end(data);
    })
  }
});

let io = require('socket.io')(server);
io.on('connection', socket => {
  console.log('1 client connected');
  //监听事件
  //2.
  socket.on('hua', msg => {
    console.log('客户端发送过来的消息是'+msg);
    //向当前客户端提交事件
    //3.
    //通知发送过来的客户端
    // socket.emit('return', msg);
    //通知所有的人（包括自己）
    // io.emit('return', msg);
    //广播给除自己以外的所有连接的客户端
    socket.broadcast.emit('return', msg);
  });
});

server.listen(3000, '127.0.0.1');
// server.listen(3000, '192.168.80.3');
