let http = require('http');
let url = require('url');

let server = http.createServer((req, res) => {
  if (req.url === '/favicon.ico') {
    return;
  }
  var userurl = req.url;
  res.writeHead(200, {"content-type": 'text/html;charset=utf-8'});
  if (userurl.substr(0, 9) === '/student/') {
    var studentid = userurl.substr(9);
    if (/^\d{10}$/.test(studentid)) {
      res.end("您要查询的学生信息，id：" + studentid);
    } else {
      res.end("学生学号位数不对" + studentid);
    }
  } else if (userurl.substr(0, 9) === '/teacher/') {
    
  }
  res.end();
});
server.listen(4000, '127.0.0.1');

/*
当用户访问 /student/1234567890 的查询此学号的学生信息
当访问 /teacher/645433 的时候，查询此老师的信息
其他的，我们提示错误，如果位数不对，也提示位数不对
*/
