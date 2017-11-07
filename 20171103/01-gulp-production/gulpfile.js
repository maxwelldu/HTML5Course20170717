// 引入 gulp
var gulp = require('gulp');
var del = require('del');

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');

// 检查脚本
gulp.task('lint', function() {
  gulp.src('./client/script/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// 编译 sass
gulp.task('sass', function() {
  gulp.src(['./client/style/**/*.scss'])
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./web/static/style'));
});

gulp.task('copy-js-map', function(){
  gulp.src([
    './bower_components/angular-messages/angular-messages.min.js.map',
  ])
  .pipe(plumber())
  .pipe(gulp.dest('./web/static/js'));
});

gulp.task('copy-css-map', function(){
  gulp.src([
    './bower_components/angular-bootstrap-datetimepicker/src/css/datetimepicker.css.map',
  ])
  .pipe(plumber())
  .pipe(gulp.dest('./web/static/style'));
});

gulp.task('copy-bundle', function(){
  gulp.src([
    './bower_components/angular-material/angular-material.min.css',
    './bower_components/textAngular/src/textAngular.css',
    './bower_components/ng-tags-input/ng-tags-input.min.css',
    './bower_components/angular-bootstrap/ui-bootstrap-csp.css',
    './bower_components/angular-bootstrap-datetimepicker/src/css/datetimepicker.css',
    './bower_components/bootstrap/dist/css/bootstrap.min.css',
    './bower_components/bootstrap/dist/css/bootstrap-theme.min.css',
    './bower_components/ng-table/dist/ng-table.min.css',
    './bower_components/ui-cropper/compile/minified/ui-cropper.css',
    'client/style/font-awesome.min.css'
    ])
    .pipe(plumber())
   .pipe(concat('bundle.css'))
   .pipe(gulp.dest('./web/static/style'));

  gulp.src([
      './bower_components/jquery/dist/jquery.min.js',
      './bower_components/angular/angular.min.js',
      './bower_components/angular-animate/angular-animate.min.js',
      './bower_components/angular-aria/angular-aria.min.js',
      './bower_components/angular-material/angular-material.min.js',
      './bower_components/angular-route/angular-route.min.js',
      './bower_components/angular-messages/angular-messages.min.js',
      './bower_components/angular-local-storage/dist/angular-local-storage.min.js',
      './bower_components/angular-bootstrap/ui-bootstrap.min.js',
      './bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      './bower_components/moment/min/moment.min.js',
      './bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js',
      './bower_components/angular-jquery/dist/angular-jquery.min.js',
      './bower_components/ng-lodash/build/ng-lodash.min.js',
      './bower_components/ng-file-upload/ng-file-upload.min.js',
      './bower_components/textAngular/dist/textAngular-rangy.min.js',
      './bower_components/textAngular/dist/textAngular-sanitize.min.js',
      './bower_components/textAngular/dist/textAngular.min.js',
      './bower_components/ng-table/dist/ng-table.js',
      './bower_components/ng-tags-input/ng-tags-input.min.js',
      './bower_components/bootstrap/dist/js/bootstrap.min.js',
      './bower_components/angular-jquery/dist/angular-jquery.min.js',
      './bower_components/ui-cropper/compile/minified/ui-cropper.js',
      './bower_components/ng-csv/build/ng-csv.min.js',
    ])
    .pipe(plumber())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./web/static/js'));
});

gulp.task('copy-other', function() {
  gulp.src('./client/other/*')
    .pipe(plumber())
    .pipe(gulp.dest('./web/static/other'));
});

gulp.task('copy-font', function() {
  gulp.src('./client/fonts/**/*')
    .pipe(plumber())
    .pipe(gulp.dest('./web/static/fonts'));
});

gulp.task('copy-image', function() {
  gulp.src('./client/image/*')
    .pipe(plumber())
    .pipe(gulp.dest('./web/static/image'));
});
gulp.task('copy-svg', function(){
  gulp.src('./client/svg/*')
    .pipe(plumber())
    .pipe(gulp.dest('./web/static/svg'));
})

// 合并，压缩文件
gulp.task('script', function(){
  gulp.src('./client/script/**/*.js')
    .pipe(plumber())
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./web/static/js'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./web/static/js'))
});

gulp.task('template', function(){
  gulp.src('./client/partial/**/*.html')
    .pipe(plumber())
    .pipe(gulp.dest('./web/partial'));
});

gulp.task('clean:app', function(cb) {
  del(['./web/static/*'], cb);
});

// 默认任务
gulp.task('default', function() {
  gulp.run('dist', 'watch');
});

gulp.task('watch', function() {
  gulp.watch('./client/script/**/*.js', ['script']);
  gulp.watch('./client/style/**/*.scss', ['sass']);
  gulp.watch('./client/other/*', ['copy-other']);
  gulp.watch('./client/image/*', ['copy-image']);
  gulp.watch('./client/svg/*', ['copy-svg']);
  gulp.watch('./client/partial/**/*.html', ['template']);
});

gulp.task('dist', [
  'clean:app',
  'lint',
  'sass',
  'script',
  'copy-bundle',
  'copy-other',
  'copy-image',
  'copy-svg',
  'copy-font',
  'copy-js-map',
  'copy-css-map',
  'template'
]);
