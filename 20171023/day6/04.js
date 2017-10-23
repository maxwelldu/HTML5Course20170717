var fs = require('fs');
var gm = require('gm');

gm("./img.png").crop(70,70,30,0).write("./img3.png",function(err){

});
