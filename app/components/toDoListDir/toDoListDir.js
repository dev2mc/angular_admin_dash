'use strict';
angular.module('angularDashboardApp')
  .directive('toDoList', function() {
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        changeCompleted: '&changeCompleted',
        delItem: '&delItem',
        addItem: '&addItem'
      },
      controller: function($scope) {
        $scope.addToDoItemVisibility = false;

        $scope.dummyNewToDoItem = {
          text: '',
          completed: false
        };

        $scope.newToDoItem = {
          text: '',
          completed: false
        };

        $scope.changeAddToDoVisibility = function() {
          $scope.addToDoItemVisibility = !$scope.addToDoItemVisibility;
        };

        $scope.clearNewToDoForm = function() {
          $scope.newToDoItem = angular.copy($scope.dummyNewToDoItem);
        };
      },
      templateUrl: '../components/toDoListDir/toDoListTemp.html'
    };
  });
