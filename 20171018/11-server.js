let http = require('http');
let fs = require('fs');
let querystring = require('querystring');
http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile('./form.html', (err, data) => {
      res.writeHead(200, {'content-type': 'text/html;charset=utf-8'});
      res.end(data);
    });
    return;
  }
  if (req.url === '/dopost' && req.method.toLowerCase() === 'post') {
    var alldata = "";
    req.addListener('data', (chunk) => {
      console.log(chunk);
      alldata += chunk;
    });
    req.addListener('end', () => {
      let datastring = alldata.toString();
      res.end('success');
      let dataObj = querystring.parse(datastring);
      console.log(dataObj);
      console.log(dataObj.username, dataObj.password);
    })
  }
}).listen(80);
