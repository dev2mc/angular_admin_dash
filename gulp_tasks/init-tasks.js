// jshint ignore: start

var gulp = require('gulp'),
    //plugin for deleting files
    del = require('del'),
    //Loads in any gulp p and attaches them to the global scope, or an object of your choice
    p = require('gulp-load-plugins')();

//load file with paths used in this project
var paths = require('../paths.json');


//-----------------INITIALIZATION----------------------
//make all needed file copying and compilation in order
//to intialize the project
//-----------------------------------------------------


//--------------BOOTSTRAP INIT-----------------
//task for copying bootstrap scss files from bower components into scss/vendor/bootstrap folder
gulp.task('init_copy_bs', function() {
	return gulp.src(paths.bower + '/bootstrap-sass/assets/stylesheets/**/*')
  .pipe(p.copy(paths.stylesScssDir + '/vendor/bootstrap', {
  	prefix: 5
  }));
});

//task for renaming _bootstrap.scss to bootstrap.scss for later compiling separate css file
gulp.task('init_rename_bs_file', ['init_copy_bs'], function() {
	gulp.src(paths.stylesScssDir + "/vendor/bootstrap/_bootstrap.scss")
	  .pipe(p.rename("bootstrap.scss"))
	  .pipe(gulp.dest(paths.stylesScssDir + "/vendor/bootstrap"))
});

//task for deleting _booststrap css from project(we don't need it any more)
gulp.task('init_del_bs_file', ['init_copy_bs', 'init_rename_bs_file'], function () {
  del([
    paths.stylesScssDir + '/vendor/bootstrap/_bootstrap.scss',
  ]);
});

//----------------FONT AWESOME INIT--------------
//copy font awesome files into scss
gulp.task('init_copy_fa_scss',['init_copy_bs'], function() {
  return gulp.src(paths.bower + '/fontawesome/scss/**/*')
  .pipe(p.copy(paths.stylesScssDir + '/vendor/fontawesome', {
    prefix: 4
  }));
});

//copy font awesome fonts into fonts folder
gulp.task('init_copy_fa_fonts', ['init_copy_fa_scss'], function() {
	return gulp.src(paths.bower + '/fontawesome/fonts/**/*')
  .pipe(p.copy(paths.fontsDir + '/fontawesome', {
  	prefix: 4
  }));
});

//----------------SCSS FILES INITIAL COMPILING--------------
//compile bootstrap and font-awesome scss files into css into styles folder
gulp.task('init_compile_vendor', ['init_copy_bs', 'init_rename_bs_file', 'init_del_bs_file', 'init_copy_fa_scss', 'init_copy_fa_fonts'], function () {
  return gulp.src(paths.stylesScssDir + '/vendor/**/*.scss')
    .pipe(p.sourcemaps.init())
      .pipe(p.sass({outputStyle: 'expanded'}).on('error', p.sass.logError))
      .pipe(p.autoprefixer({
        browsers: ["Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", "Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"],
        cascade: false
      }))
      .pipe(p.uncss({html: [paths.app + '/index.html', paths.app + '/components/**/*.html']}))
    .pipe(p.sourcemaps.write())
    .pipe(p.rename(function(path) {
        path.dirname = "../styles/";
      }))
    .pipe(gulp.dest(paths.stylesCssDir))
});
