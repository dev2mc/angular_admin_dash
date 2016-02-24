'use strict';
angular.module('angularDashboardApp')
  .directive('sideBar', function() {
    return {
      restrict: 'EA',
      scope: {
      },
      templateUrl: '../components/sideBar/sideBarTemplate.html'
    };
  });
