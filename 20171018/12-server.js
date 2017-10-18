let http = require('http');
let fs = require('fs');
let formidable = require('formidable');
let util = require('util');

http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('./form.html', (err, data) => {
      res.writeHead(200, {'content-type': 'text/html;charset=utf-8'});
      res.end(data);
    });
    return;
  }
  if (req.url === '/dopost' && req.method.toLowerCase() === 'post') {
    //创建一个新的来源表单
    let form = new formidable.IncomingForm();
    form.uploadDir = './uploads';
    form.keepExtensions = true;
    form.parse(req, (err, fileds, files) => {
      if (err) {
        throw err;
      }
      console.log(fileds, files);
      console.log(util.inspect({fileds, files}));//ES6的简写相当于，{fileds: fileds, files: files}
      res.writeHead(200, {'content-type':'text/html;charset=utf-8'});
      res.end('成功');
    });
  }
}).listen(80);
