'use strict';
angular.module('angularDashboardApp')
  .controller('dashboardCtrl', dashboardCtrl);

function dashboardCtrl() {
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

  ctrl.todoListData = [
    {
      _id: '0001',
      text: 'Do your ToDo List today at 6AM GMT',
      completed: true
    },
    {
      _id: '0002',
      text: 'Do your ToDo List today at 2AM GMT',
      completed: false
    },
    {
      _id: '0003',
      text: 'Do your ToDo List today at 4AM GMT',
      completed: false
    },
    {
      _id: '0004',
      text: 'Do your ToDo List today at 3AM GMT',
      completed: false
    }
  ];

  ctrl.dummyNewToDoItem = {
    text: '',
    completed: false
  };

  ctrl.newToDoItem = {
    text: '',
    completed: false
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

  ctrl.changeCompleted = function (id) {
    angular.forEach(ctrl.todoListData, function(v) {
      if (v._id === id) {
        v.completed = !v.completed;
      }
    });
  };

  ctrl.delToDoItem = function(id) {
    angular.forEach(ctrl.todoListData, function(v, i) {
      if (v._id === id) {
        ctrl.todoListData.splice(i, 1);
      }
    });
  };

  ctrl.addToDoItemVisibility = false;

  ctrl.changeAddToDoVisibility = function() {
    ctrl.addToDoItemVisibility = !ctrl.addToDoItemVisibility;
  };

  ctrl.addToDoItem = function(item) {
    item._id = ctrl.genRandomNumb();
    ctrl.todoListData.push(item);
    console.log(item);
  };

  ctrl.clearNewToDoForm = function() {
    ctrl.newToDoItem = angular.copy(ctrl.dummyNewToDoItem);
  };
}
