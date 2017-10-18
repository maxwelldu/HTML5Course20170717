let fs = require('fs');
let folders = [];
fs.readdir('./canvas-svg', function(err, files) {
  for (var i = 0; i < files.length; i ++) {
    (function(i){
      var filename = files[i];
      fs.stat('./canvas-svg/' + files[i], function(err, stats) {
        if (stats.isDirectory()) {
          folders.push(filename);
        }
        console.log(folders);
      });
    })(i);
  }
});
