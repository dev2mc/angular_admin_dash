'use strict';
angular.module('angularYeomanApp')
  .controller('MainCtrl', function ($scope, localStorageService) {
  	var todosInStore = localStorageService.get('todos');
  	$scope.todos = todosInStore || [];
  	$scope.$watch('todos', function() {
  		localStorageService.set('todos', $scope.todos);
  	}, true);

    $scope.addTodo = function() {
    	if (($scope.todo !== '') && ($scope.todos.indexOf($scope.todo) === -1)) {
    		$scope.todos.push($scope.todo);
    		$scope.todo = '';
    	}
    };

    $scope.removeTodo = function(index) {
    	$scope.todos.splice(index, 1);
    };
  });