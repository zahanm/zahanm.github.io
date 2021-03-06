'use strict';

var gulp = require('gulp'),
  connect = require('gulp-connect'),
  less = require('gulp-less'),
  markdown = require('gulp-markdown'),
  tap = require('gulp-tap'),
  template = require('gulp-template'),
  data = require('gulp-data'),
  rename = require('gulp-rename'),
  babel = require('gulp-babel'),
  autoprefix = new (require('less-plugin-autoprefix'))(),
  path = require('path'),
  spawn = require('child_process').spawn,
  assert = require('assert');

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
    .pipe(tap(function (file, t) {
      var ext = path.extname(file.path);
      var name = path.basename(file.path, ext);
      return gulp.src('templates/' + name + '.jst')
        .pipe(data(function () {
          assert(file.isBuffer(), 'cannot do streams atm');
          return { contents: file.contents.toString() };
        }))
        .pipe(template())
        .pipe(rename(function (path) {
          path.extname = '.html';
        }))
        .pipe(gulp.dest('.'));
    }));
});

gulp.task('babel', function () {
  return gulp.src('src/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/'));
});

gulp.task('flow', function () {
  var flow = spawn('flow', ['status', 'src/']);
  flow.stdout.pipe(process.stdout);
  flow.stderr.pipe(process.stderr);
});

gulp.task('watch', function () {
  gulp.watch('less/*.less', ['less']);
  gulp.watch(['markdown/*.md', 'templates/*.jst'], ['markdown']);
  gulp.watch('src/*.js', ['flow', 'babel']);
});
