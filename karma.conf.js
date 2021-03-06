// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2016-01-14 using
// generator-karma 1.0.1

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      "app/bower_components/jquery/dist/jquery.js",
      "app/bower_components/angular/angular.js",
      "app/bower_components/bxslider-4/dist/jquery.bxslider.js",
      "app/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js",
      "app/bower_components/angular-animate/angular-animate.js",
      "app/bower_components/angular-cookies/angular-cookies.js",
      "app/bower_components/angular-resource/angular-resource.js",
      "app/bower_components/angular-route/angular-route.js",
      "app/bower_components/angular-sanitize/angular-sanitize.js",
      "app/bower_components/angular-touch/angular-touch.js",
      "app/bower_components/jquery-ui/jquery-ui.js",
      "app/bower_components/angular-ui-sortable/sortable.js",
      "app/bower_components/angular-local-storage/dist/angular-local-storage.js",
      "app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
      "app/bower_components/d3/d3.js",
      "app/bower_components/c3/c3.js",
      "app/bower_components/angular-mocks/angular-mocks.js",
      // endbower
      "app/app.js",
      "app/components/**/*.js",
      // "../unit-tests/mock/**/*.js",
      "unit-tests/spec/**/*.js",

      //html templates
      "app/components/**/*.html"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      prependPrefix: '../',
      moduleName: 'appTemplates'
    },

    preprocessors: {
      'app/components/**/*.html': 'ng-html2js'
    },



    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-ng-html2js-preprocessor",
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
