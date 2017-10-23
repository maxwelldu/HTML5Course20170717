var crypto = require("crypto");

console.log(md5('1'));
console.log(md5('2'));
console.log(md5('3'));
console.log(md5(md5("123456").substr(11,7) + md5("123456")));

function md5(mingma){
	var md5 = crypto.createHash('md5');
	var password = md5.update(mingma).digest('base64');
	return password;
}
