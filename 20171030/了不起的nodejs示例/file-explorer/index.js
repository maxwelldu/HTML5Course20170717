var fs = require('fs'),
stdin = process.stdin,
stdout = process.stdout;
fs.readdir(__dirname, function (err, files) {
  // 为了避免再次执行fs.stat, 把stat对象保存起来
  var stats = [];
  // console.log(files);
  console.log(''); // 显示空行
  if (!files.length) { // 如果files数组为空，提示没有文件。显示红色
    return console.log('    \033[31m No files to show!\033[39m\n');
  }
  console.log('    Select which file or directory you want to see\n');

  // 第一种异步流控制模式：串行执行
  function file(i) {
    var filename = files[i];
    fs.stat(__dirname + '/' + filename, function (err, stat) {
      stats[i] = stat;
      if (stat.isDirectory()) {
        console.log('    ' + i + '    \033[36m' + filename + '/\033[39m');
      } else {
        console.log('    ' + i + '    \033[90m' + filename + '/\033[39m');
      }
      i++; // 计数器累加,检查是否还有未处理的文件
      if (i === files.length) { // 所有文件都处理完毕，此时提示用户进行选择
        read();
      } else {
        file(i);
      }
    });
  }
  file(0);

  function read () {
    console.log('');
    stdout.write('    \033[33mEnter your choice: \033[39m');
    // 等待用户输入
    stdin.resume();
    stdin.setEncoding('utf8');
    stdin.on('data', option);
  }

  function option (data) {
    var filename = files[Number(data)];
    if (!filename) {
      stdout.write('    \033[31mEnter your choice: \033[39m');
    } else {
      stdin.pause();
      if (stats[Number(data)].isDirectory()) {
        fs.readdir(__dirname + '/' + filename, function (err, files) {
          console.log('');
          console.log('    (' + files.length + ' files)');
          files.forEach(function (file) {
            console.log('      -  ' + file);
          })
        });
        console.log('');
      } else {
        fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data) {
          console.log('');
          // 添加一些辅助缩进后将文本进行输出
          console.log('\033[90m' + data.replace(/(.*)/g, '    $1') + '\033[39m');
        });
      }
    }
  }
});

// 供学习
// 同步
// console.log(fs.readdirSync(__dirname));

// 异步
// function async(err, files) { console.log(files); }
// fs.readdir('.', async);
