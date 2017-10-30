var net = require('net');
//var client = net.connect(3000, 'localhost');
var client = net.connect(6667, 'irc.freenode.net');
client.on('connect', function () {
  client.write('NICK mynick\r\n');
  client.write('USER mynick 0 * :realname\r\n');
  client.write('JOIN #node.js\r\n');
});
