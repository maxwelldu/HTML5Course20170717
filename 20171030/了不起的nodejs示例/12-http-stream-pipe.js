require('http').createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'image/png' });
  // var stream = require('fs').createReadStream('image.png');
  // stream.on('data', function (data) {
  //   res.write(data);
  // });
  // stream.on('end', function () {
  //   res.end();
  // });
  //上面这种流和我们的响应流的对接像上面这样写非常麻烦，所以有简单的API让我们完成流的对接
  require('fs').createReadStream('image.png').pipe(res);
}).listen(3000);
