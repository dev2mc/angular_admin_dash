'use strict';
angular.module('angularDashboardApp')
  .directive('toDoList', function() {
    return {
      restrict: 'EA',
      scope: {

      },
      controller: function($scope) {
        
      }
      templateUrl: '../components/toDoListDir/toDoListTemp.html'
    };
  });
