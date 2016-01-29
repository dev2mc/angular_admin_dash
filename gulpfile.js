// jshint ignore: start
'use strict';

var gulp = require('gulp'),
  //load tasts from separate files
	requireDir = require('require-dir'),
  //several utilities for gulp
  gutil = require('gulp-util'),
  //plugin for deleting files
  del = require('del'),
  //plugin for loading tasks for gulp
  p = require('gulp-load-plugins')(),
  //a toolkit to make creating and working with streams easy.
  es = require('event-stream'),
  //plugin for reloading browser on assets changing
  browserSync = require('browser-sync').create(),
  //load server for karma test runner
  Server = require('karma').Server;

//LOAD ALL TASK FILES FROM GULP_TASKS FOLDER
requireDir('./gulp_tasks');

//load file with paths used in this project
var paths = require('./paths.json');

//wire all dependencies (vendor and custom files) into index.html
gulp.task('wire', ['scss'], function() {
  //inject bower dependencies into karma.conf.js config file
  gulp.src('test/karma.conf.js')
    .pipe(p.wiredep({devDependencies: true}))
    .pipe(gulp.dest('test'));

  gulp.src(paths.app + '/index.html')
  //inject bower dependencies into index.html
  .pipe(p.wiredep())
  //injecting vendor css
  .pipe(p.inject(
    gulp.src([paths.stylesCss, '!' + paths.stylesCssDir + '/main.css'], {read: false})
    , {relative: true, starttag: '<!-- inject:vendor:{{ext}} -->'}))
  //injecting custom css
  .pipe(p.inject(
    gulp.src(paths.stylesCssDir + '/main.css', {read: false})
    , {relative: true, starttag: '<!-- inject:custom:{{ext}} -->'}))
  //injecting angular js files
  .pipe(p.inject(
    gulp.src([paths.app + '/app.js', paths.scripts, '!' + paths.bower + '/**/*'])
    , {relative: true, starttag: '<!-- inject:angularcustom:{{ext}} -->'}))

  .pipe(gulp.dest(paths.app));
});

//save stream of html partials converted into angular js modules
var angHtmlPartJs = gulp.src(paths.partials)
    .pipe(p.htmlmin({collapseWhitespace: true}))
    .pipe(p.ngHtml2js({
      moduleName: paths.appName,
    }))
    .pipe(p.concat('partial.js'))

//concatinate and minify files for destribution with usemin and other plugins
gulp.task('html', ['cleanDist', 'wire'], function() {
  //merge two streams (html-js partials and assets from usemin) in one
  return es.merge((gulp.src(paths.app + '/index.html').pipe(p.usemin())), angHtmlPartJs)
    .pipe(p.print())
    //add ugly array syntax for angular dependencies
    .pipe(p.if('**/app.min.js', p.ngAnnotate()))
    //make app.min.file first in stream
    .pipe(p.order(['**/app.min.js', '**/*']))
    //concatinate partial.js (html partial converted to ang modules) with app.min.js
    .pipe(p.if(['**/partial.js', '**/app.min.js'], p.concat('scripts/app.min.js')))
    .pipe(p.if('*.js', p.uglify()))
    .pipe(p.if('*.css', p.cssnano({discardComments: {removeAll: true}})))
    .pipe(p.if('*.html', p.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest(paths.dist));
});

//config for karma testing
gulp.task('test_single', ['dev'], function (done) {
  new Server({
    configFile: __dirname + '\\test\\karma.conf.js',
    singleRun: true
  }, function() {done();}).start();
});

//task for images minification with gulp-imagemin plugin
gulp.task('minImg', ['cleanDist'], function () {
  return gulp.src(paths.imagesApp)
    .pipe(p.imagemin({
        optimizationLevel: 3
    }))
    .pipe(gulp.dest(paths.imagesDistDir));
});

//task for copying unedited assest fonts, etc.. to dist folder
gulp.task('dist_copy_assets', ['cleanDist'], function(){
  return gulp.src(paths.fonts)
  .pipe(p.copy(paths.fontsDirDist, {
    prefix: 2
  }))
});

//task for clearing dist folder before building
gulp.task('cleanDist', ['wire'], function () {
  return del([
    paths.dist + '/**/*',
  ]);
});

//task for serving file for development from app folder
gulp.task('serve', ['scss', 'wire'], function() {
  browserSync.init({
    server: './' + paths.app
  });

  gulp.watch(paths.stylesScss, {
    interval: 1000, // default 100
    debounceDelay: 1000, // default 500
    mode: 'poll'
  }, ['scss', 'wire']);

  gulp.watch(paths.html).on('change', browserSync.reload);

  gulp.watch(paths.bower + '/**/*', {
    interval: 1000, // default 100
    debounceDelay: 1000, // default 500
    mode: 'poll'
  }, ['wire']);

  gulp.watch([paths.app + '/app.js', paths.app + '/components/**/*.js'], {
    interval: 1000, // default 100
    debounceDelay: 1000, // default 500
    mode: 'poll'
  }, ['wire'])
});

//task for compiling development assets but without browserSync
gulp.task('dev', ['scss', 'wire']);

//default gulp task will serve development envirnment from app folder
gulp.task('default', ['serve']);

//task for single run karma unit test of the app
gulp.task('test', ['test_single']);

//task for building app for distribution
gulp.task('build', ['html', 'dist_copy_assets', 'minImg']);

//building app for distribution and launching server from build folder
gulp.task('build:serve', ['html', 'dist_copy_assets', 'minImg'], function() {
  browserSync.init({
    server: './' + paths.dist
  });
});