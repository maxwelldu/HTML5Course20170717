let http = require('http');
console.log(http);

var i = 0;
let server = http.createServer((req, res) => {
  i++;
  res.write('hello world, nodejs');
  res.end(i+'');
  console.log('A');
});
console.log('B');
server.listen(4000, '127.0.0.1');
