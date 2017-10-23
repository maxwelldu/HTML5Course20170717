var fs = require('fs');
var gm = require('gm');

gm('./img.png')
    .resize(50, 50,"!")
    .write('./img2.png', function (err) {
        if (err) {
            console.log(err);
        }
    });
