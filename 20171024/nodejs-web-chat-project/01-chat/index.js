var app = require('express')();
var http = require('http').Server(app);
var io=require('socket.io')(http);
app.get('/', function(req, res){
  //res.send('<h1>Hello world</h1>');
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected:'+socket);
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

 socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});
