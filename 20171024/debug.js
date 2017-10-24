let http = require('http');
http.createServer((req, res) => {
  console.log('hi');
  if (name === 'maxwelldu') {
    console.log('登录成功');
  } else {
    console.log('未登录');
  }
  var name = 'maxwelldu';
  res.end('hi');
}).listen(3000);
