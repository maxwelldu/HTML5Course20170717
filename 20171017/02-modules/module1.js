function hi() {
  console.log('hi');
}

/*
module.exports = hi;
module.exports.abc = 'abc';
*/
console.log(module);
//每个JS文件里面的内容都是私有的，需要暴露出去的内容通过module.exports去导出，这样导入的时候才能使用
module.exports = {
  hi: hi,
  abc: 'abc'
}
