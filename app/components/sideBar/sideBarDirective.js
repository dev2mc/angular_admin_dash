'use strict';
angular.module('angularDashboardApp')
  .directive('sideBar', function() {
    return {
      restrict: 'EA',
      scope: {
        linksData = []
      }
    }
  });
