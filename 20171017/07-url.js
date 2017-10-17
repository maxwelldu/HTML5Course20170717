let http = require('http');
let url = require('url');

let server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    return;
  }
  //url.parse()可以将一个完整的URL地址分成很多部分：
  //host  port pathname path querystring
  var pathname = url.parse(req.url).pathname;
  console.log(pathname);
  //url.parse()如果第二个参数是true, 可以将所有的查询变成对象
  var query = url.parse(req.url, true).query;
  //得到name
  console.log(query.name);

  res.end();
});
server.listen(4000, '127.0.0.1');
