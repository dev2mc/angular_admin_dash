'use strict';
angular
  .module('angularDashboardApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'LocalStorageModule',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      // .when('/', {
      //   templateUrl: 'components/tasksComponent/tasksComponent.html',
      //   controller: 'tasksComponentCtrl'
      // })
      .when('/', {
        templateUrl: '../components/fourOhFourComponent/fourOhFour.html'
      })
      .when('/tasks', {
        templateUrl: '../components/tasksComponent/tasksComponent.html',
        controller: 'tasksComponentCtrl'
      })
      .when('/404', {
        templateUrl: '../components/fourOhFourComponent/fourOhFour.html'
      })
      // .when('/about', {
      //   templateUrl: 'components/aboutComponent/aboutComponent.html',
      //   controller: 'AboutCtrl'
      // })
      .otherwise({
        redirectTo: '/404'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  })
  .config(['localStorageServiceProvider', function(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('ls');
  }]);
