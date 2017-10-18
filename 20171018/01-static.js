let http = require('http');
let url = require('url');
let fs = require('fs');
let path = require('path');

http.createServer((req, res) => {
  if (req.url === '/favicon.ico') return;
  var pathname = url.parse(req.url).pathname;
  //默认首页
  if (pathname === '/') {
    pathname = 'index.html';
  }
  //拓展名
  var extname = path.extname(pathname);
  //真的读取这个文件
  fs.readFile('./static/' + pathname, (err, data) => {
    if (err) {
      console.log(err);
      //如果此文件不存在，就应该返回404
      fs.readFile('./static/404.html', (err, data) => {
        res.writeHead(200, {'content-type':'text/html;charset=utf-8'});
        res.end(data);
        return;
      })
      return;
    }
    //MIME类型，就是
    //网页文件：text/html;
    //png: image/png
    var mime = getMime(extname);
    res.writeHead(200, {"Content-Type": mime});
    res.end(data);
  });
  // res.end(pathname+' '+extname);
}).listen(3000);

function getMime(extname) {
  //表驱动法
  var extObj = {
    ".html": "text/html",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".css": "text/css",
    ".js": "text/javascript"
  };
  return extObj[extname];
}
