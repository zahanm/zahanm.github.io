
var gulp = require('gulp'),
  connect = require('gulp-connect'),
  less = require('gulp-less'),
  autoprefix = new (require('less-plugin-autoprefix'))()
  markdown = require('gulp-markdown'),
  wrap = require('gulp-wrap'),
  tap = require('gulp-tap'),
  path = require('path'),
  assert = require('assert'),
  template = require('gulp-template'),
  data = require('gulp-data'),
  log = require('gulp-util').log,
  debug = require('gulp-debug');

gulp.task('server', function() {
  connect.server({
    port: 8000
  });
});

gulp.task('less', function() {
  return gulp.src('less/*.less')
    .pipe(less({
      plugins: [autoprefix]
    }))
    .pipe(gulp.dest('css/'));
});

gulp.task('markdown', function () {
  return gulp.src('markdown/*.md')
    .pipe(markdown())
    .pipe(debug({ title: 'pre' }))
    .pipe(tap(function (file, t) {
      var name = path.basename(file.path).split('.')[0];
      return gulp.src('templates/' + name + '.jst')
        .pipe(debug({ title: 'in' }))
        .pipe(data(function () {
          assert(file.isBuffer(), 'cannot do streams atm');
          return { contents: file.contents };
        }))
        .pipe(template())
        .pipe(gulp.dest('temp/'));
    }));
});

gulp.task('watch', function () {
  gulp.watch('less/*.less', ['less']);
})
