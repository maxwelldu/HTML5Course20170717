let http = require('http');
let fs = require('fs');
let formidable = require('formidable');
let util = require('util');
let sd = require('silly-datetime');
let path = require('path');

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

      //时间，使用silly-datetime
      let time = sd.format(new Date(), 'YYYYMMDDHHmmss');
      let rand = Number.parseInt(Math.random() * 89999 + 10000);
      let extname = path.extname(files.pic.name);
      let oldpath = __dirname + '/' + files.pic.path;
      //新的路径
      var newpath = __dirname + '/uploads/' + time + rand + extname;
      //改名
      fs.rename(oldpath, newpath, (err) => {
        if (err) {
          throw err;
        }
        res.writeHead(200, {'content-type':'text/html;charset=utf-8'});
        res.end('成功');
      });

    });
  }
}).listen(80);
