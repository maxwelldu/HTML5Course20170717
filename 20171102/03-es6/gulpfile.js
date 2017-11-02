let gulp = require('gulp');
let babel = require('gulp-babel');

gulp.task('es6', () => {
  gulp.src('js/*.js')
  .pipe(babel())
  .pipe(gulp.dest('./dist/js'))
});

gulp.task('default', ['es6'], () => {
  gulp.watch('js/*.js', ['es6'])
});
