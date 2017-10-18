let fs = require('fs');
let folders = [];
fs.readdir('./canvas-svg', function(err, files) {
  (function iterator(i){
    if (i === files.length) {
      console.log(folders); return;
    }
    var filename = files[i];
    fs.stat('./canvas-svg/' + files[i], function(err, stats) {
      if (stats.isDirectory()) {
        folders.push(filename);
      }
      iterator(i+1);
    });
  })(0);
});
