var fs = require('fs');
//获取工作目录下所有的文件
var files = fs.readdirSync(process.cwd());
files.forEach(function (file) {
  //监听".css"后缀的文件
  if (/\.css/.test(file)) {
    fs.watchFile(process.cwd() + '/' + file, function () {
      console.log(' - ' + file + ' changed!');
    });
  }
})
