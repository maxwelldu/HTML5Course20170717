var net = require('net');
var count = 0;
var users = {};
var server = net.createServer(function (conn) {
  function broadcast (msg, exceptMyself) {
    for (var i in users) {
      if (!exceptMyself || i !== nickname) {
        users[i].write(msg);
      }
    }
  }

  var nickname;
  console.log('\033[90m new connection!\033[39m');
  conn.write(
    '\n > welcome to \033[92mnode-chat \033[39m!'
    + '\n > ' + count + ' other people are connected at this time.'
    + '\n > please write your name and press enter: '
  );
  count++;

  conn.setEncoding('utf8');
  conn.on('data', function (data) {
    data = data.replace('\r\n', '');
    if (!nickname) {
      if (users[data]) {
        conn.write('\033[93m> nickname already in use. try again: \033[39m ');
        return;
      } else {
        nickname = data;
        users[nickname] = conn;

        broadcast('\033[90m > ' + nickname + 'joined the room\033[39m\n');
      }
    } else {
      //否则视为聊天内容
      broadcast('\033[96m > ' + nickname + ':\033[39m ' + data + '\n', true);
    }
    console.log(data);
  });
  conn.on('close', function () {
    count--;
    delete users[nickname];
    broadcast('\033[90m > ' + nickname + ' left the room\033[39m\n');
  });
});

server.listen(3000, function () {
  console.log('\033[96m server listening on *:3000\033[39m');
});
