'use strict';

angular.module('angularDashboardApp')
  .controller('dashboardCtrl', function($scope, toDoListRemote) {
    $scope.stackedCartData = {
      columns: [
        ['Sales', 100, 200, 320, 789, 500, 250],
        ['Users', 50, 325, 125, 450, 233, 350]
      ],
      types: {
        Sales: 'area-spline',
        Users: 'area-spline'
      }
    };

    $scope.todoListData = [];

    $scope.getTodoData = function() {
      toDoListRemote.getAllToDo().then(function(data) {
        $scope.todoListData = data;
      });
    };

    $scope.genRandomNumb = function() {
      var idLength = 7;
      var numberStr = Math.floor((Math.random() * Math.pow(10, idLength)) + 1) + '';
      if (numberStr.length < idLength) {
        var diff = idLength - numberStr.length;
        for (var i = 1; i <= diff; i++) {
          numberStr = '0' + numberStr;
        }
      }
      return numberStr;
    };

    $scope.changeCompleted = function(id) {
      angular.forEach($scope.todoListData, function(v) {
        if (v._id === id) {
          var updItem = angular.copy(v);
          updItem.completed = !updItem.completed;

          toDoListRemote.updateToDo(updItem, id).then(function() {
            v.completed = !v.completed;
          });
        }
      });
    };

    $scope.delToDoItem = function(id) {
      angular.forEach($scope.todoListData, function(v, i) {
        if (v._id === id) {
          toDoListRemote.removeToDo(id).then(function() {
            $scope.todoListData.splice(i, 1);
          });
        }
      });
    };

    $scope.addToDoItem = function(item) {
      item._id = $scope.genRandomNumb();
      toDoListRemote.addToDo(item).then(function(data) {
        $scope.todoListData.push(data);
      });
    };

    $scope.init = function() {
      $scope.getTodoData();
    };

    $scope.init();
  });
