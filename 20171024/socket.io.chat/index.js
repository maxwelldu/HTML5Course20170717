var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var currentUserCount = 0;
var socketList = [];

app.get('/', function(req, res){
  // res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  currentUserCount++;
  socketList.push(socket);
  //所有人,包括自己
  io.emit('global', {currentUserCount});

  console.log(socket);
  console.log('a user connected');
  socket.on('disconnect', function(){
    currentUserCount--;
    var index = socketList.indexOf(socket);
    socketList.splice(index, 1);
    io.emit('global', {currentUserCount});

    console.log('user disconnected');
    io.emit('user disconnected');
  });
  socket.on('chat message', function(data){
    console.log('message:', data);
    //for everyone
    // io.emit('msg', data);
    //for myself
    // socket.emit('msg', data);
    //for others
    socket.broadcast.emit('msg', data);
  });
  socket.on('typing', function(data){
    socket.broadcast.emit('typing', data);
  });
  socket.on('private message', function(from, msg){
    console.log('I received a private msggage by ', from, ' saying ', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
