let http = require('http');
let fs = require('fs');
console.log(fs);

let server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    return;
  }
  if (req.url === '/a.txt') {
    fs.readFile('./a.txt', function(error, data) {
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(data);
    });
  } else if (req.url === '/index.html') {
    fs.readFile('./index.html', function(error, data) {
      res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
      res.end(data);
    });
  } else if (req.url === '/a.png') {
    fs.readFile('./canvas-svg/svg/分享.png', function(error, data) {
      res.writeHead(200, {'Content-Type': 'image/png'});
      res.end(data);
    });
  } else if (req.url === '/a.css') {
    fs.readFile('./a.css', function(error, data) {
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.end(data);
    });
  } else {
    res.end('hello world, nodejs');
    console.log('A');
  }
});
console.log('B');
server.listen(4000, '127.0.0.1');
