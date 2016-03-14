'use strict';
var dashboardCtrl = function (toDoListRemote) {
  /*jshint validthis:true */
  var ctrl = this;

  ctrl.stackedCartData = {
    columns: [
      ['Sales', 100, 200, 320, 789, 500, 250],
      ['Users', 50, 325, 125, 450, 233, 350]
    ],
    types: {
      Sales: 'area-spline',
      Users: 'area-spline'
    }
  };

  ctrl.todoListData = [];

  ctrl.getTodoData = function() {
    toDoListRemote.getAllToDo().then(function(data) {
      ctrl.todoListData = data;
    });
  };

  ctrl.genRandomNumb = function() {
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

  ctrl.changeCompleted = function(id) {
    angular.forEach(ctrl.todoListData, function(v) {
      if (v._id === id) {
        var updItem = angular.copy(v);
        updItem.completed = !updItem.completed;

        toDoListRemote.updateToDo(updItem, id).then(function() {
          v.completed = !v.completed;
        });
      }
    });
  };

  ctrl.delToDoItem = function(id) {
    angular.forEach(ctrl.todoListData, function(v, i) {
      if (v._id === id) {
        toDoListRemote.removeToDo(id).then(function() {
          ctrl.todoListData.splice(i, 1);
        });
      }
    });
  };

  ctrl.addToDoItem = function(item) {
    item._id = ctrl.genRandomNumb();
    toDoListRemote.addToDo(item).then(function(data) {
      ctrl.todoListData.push(data);
    });
  };

  ctrl.init = function() {
    ctrl.getTodoData();
  };

  ctrl.init();
};

dashboardCtrl.$inject = ['toDoListRemote'];

angular.module('angularDashboardApp')
  .controller('dashboardCtrl', dashboardCtrl);
