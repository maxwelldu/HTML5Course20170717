let http = require('http');
console.log(http);

let server = http.createServer((req, res) => {
  var random = Math.random();
  console.log(random);
  if (random > 0.9) {
    throw new Error('炸了');
  }
  res.end('hello world, nodejs');
});
console.log('B');
server.listen(4000, '127.0.0.1');
