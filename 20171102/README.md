#gulp使用入门
安装node
`提示npm command not found 可以重新安装node`
//安装全局的gulp命令
npm i -g gulp
gulp -v //验证一下
`提示gulp找不到，查找npm i -g gulp输出的结果最后两行，找到安装后的目录，把这个目录的地址复制了放到环境变量里面，注意英文的分号`
mkdir 01-compressjs
cd 01-compressjs
npm init -y
npm i -D gulp
npm i -D gulp-uglify
vim gulpfile.js
gulp script
gulp auto
gulp

ES6
npm i -D gulp-babel
npm i -D babel-core
npm i -D babel-preset-env
vim .babelrc
```
{
  "presets": ["env"]
}
```

#作业
晚上自己写一篇gulp入门的文档，放到https://segmentfault.com/ 上面，然后把链接发给助教统计一下
把ES6中常用的敲一遍
