let http = require('http');
let gulp = require('gulp');
let _ = require('underscore');

console.log(__dirname);
http.createServer((req, res) => {
  res.end('hello world');
}).listen(80);
