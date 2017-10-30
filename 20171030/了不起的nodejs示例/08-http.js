require('http').createServer(function (req, res) {
  res.writeHead(200);
  res.end('Hello <b>world</b>');
}).listen(3000);
