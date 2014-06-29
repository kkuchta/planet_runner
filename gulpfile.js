var gulp = require('gulp');
var hamlc = require('gulp-haml-coffee');
var coffee = require('gulp-coffee');
var gutil = require('gulp-util');

gulp.task('default', ['coffee', 'hamlc', 'lib'], function() {

});

gulp.task('watch', function() {
  gulp.watch(coffee_path, ['coffee']);
  gulp.watch(hamlc_path, ['hamlc']);
  gulp.watch(lib_path, ['lib']);
});

hamlc_path = './src/**/*.hamlc'
gulp.task('hamlc', function() {
  gulp.src(hamlc_path)
    .pipe(hamlc())
    .pipe(gulp.dest('./out'));
});

coffee_path = './src/**/*.coffee'
gulp.task('coffee', function() {
  gulp.src(coffee_path)
    .pipe(coffee().on('error', gutil.log))
    .pipe(gulp.dest('./out'));
});

lib_path = './lib/**/*.js'
gulp.task('lib', function() {
  gulp.src(lib_path)
    .pipe(gulp.dest('./out/scripts'));
});
