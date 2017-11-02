// 引入gulp, 实际上是Gulp的一个实例对象
let gulp = require('gulp');
// 是一个压缩js的插件 ，返回的是一个函数
let uglify = require('gulp-uglify');
// 是一个压缩css的插件，返回的是一个函数
let minifyCss = require('gulp-minify-css');
let babel = require('gulp-babel');
// 新建一个名叫script的任务
gulp.task('script', () => {
  //读取js/*.js; 通过管道让uglify()去处理所有的流，通过管道把文件写入到目标文件中
  //**/表示js目录任意多层级目录下的js文件
  gulp.src('js/**/*.js').pipe(babel()).pipe(uglify()).pipe(gulp.dest('dist/js'));
});
// 新建一个名为css的任务
gulp.task('css', () => {
  // 读取css/*.css文件, 通过管道minifycss()去处理，再放入到目标文件
  gulp.src('css/**/*.css').pipe(minifyCss()).pipe(gulp.dest('dist/css'));
})
//新建一个名为auto的任务
gulp.task('auto', function(){
  // 监听js/*.js文件，如果发生变化则执行script
  gulp.watch('js/**/*.js', ['script']);
  gulp.watch('css/**/*.css', ['css']);
});
//新建一个名叫default的任务，执行这些任务之前，先执行script,css,auto任务
gulp.task('default', ['script', 'css', 'auto']);
console.log(gulp);
console.log(gulp.__proto__);
