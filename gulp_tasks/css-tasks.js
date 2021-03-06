// jshint ignore: start

var gulp = require('gulp'),
    //Loads in any gulp p and attaches them to the global scope, or an object of your choice
    p = require('gulp-load-plugins')();

var gutil = require('gulp-util');

//plugin for reloading browser on assets changing
var browserSync = require('browser-sync').create();

var paths = require('../paths.json');

//----------------------------------------------
//--------------CSS COMPILATION-----------------
//----------------------------------------------

//----------APP SCSS----------------------
//compile scss to css in app directory and strip unused styles for compiles vendor css files.

var vendCssFiles = ['bootstrap.css', 'font-awesome.css']

var filterFilesArr = vendCssFiles;

var filterFiles = function(file) {
  for (var i = 0; i < filterFilesArr.length; i++) {
    if (file.path.indexOf(filterFilesArr[i]) >= 0) {
      return true;
    };
  };
}

var ignoredSelectors = [
  //selectors for modal window which used for adding new task item
  '.modal-open',
  '.modal',
  '.modal.fade .modal-dialog',
  '.modal.in .modal-dialog',
  '.modal-open .modal',
  '.modal-dialog',
  '.modal-content',
  '.modal-backdrop',
  '.modal-backdrop.fade',
  '.modal-backdrop.in',
  '.modal-header',
  '.modal-header .close',
  '.modal-title',
  '.modal-body',
  '.modal-footer',
  '.modal-footer .btn + .btn',
  '.modal-footer .btn-group .btn + .btn',
  '.modal-footer .btn-block + .btn-block',
  '.modal-scrollbar-measure',
  '.modal-sm',
  '.modal-lg',
  '.modal.fade .modal-dialog',
  //selector for font-awesome
  '.fa .fa-times-circle',
  '.fa-times-circle',
  '.fa .fa-undo',
  '.fa-undo',
  '.fa .fa-check',
  '.fa-check'
];

//compile scss files into css and removed unused styles with uncess from files specified in filterFilesArr array
gulp.task('scss', function () {
  gulp.src(paths.stylesScss)
    .pipe(p.plumber())
    .pipe(p.sourcemaps.init())
      .pipe(p.sass({outputStyle: 'expanded'})
      .on('error', p.sass.logError))
      .pipe(p.autoprefixer({
        browsers: ["Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", "Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"],
        cascade: false
      }))
      .pipe(p.if(filterFiles, p.uncss({html: [paths.app + '/index.html', paths.app + '/components/**/*.html'], ignore: ignoredSelectors})))
    .pipe(p.sourcemaps.write())
    .pipe(p.rename(function(path) {
        path.dirname = "../styles/";
      }))
    .pipe(gulp.dest(paths.stylesCssDir))
    .pipe(browserSync.stream());
});
