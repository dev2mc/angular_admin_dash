'use strict';
describe('toDoList directive: ', function () {
  var element, scope, dashboard;

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    element = '<to-do-list data="dashboard.todoListData" change-completed="dashboard.changeCompleted(id)" del-item="dashboard.delToDoItem(id)" add-item="dashboard.addToDoItem(item)"></to-do-list>';

    dashboard = {};

    dashboard.todoListData = [
      {
        _id: '3937483',
        text: 'Do your ToDo List today at 4AM GMT',
        completed: false
      },
      {
        _id: '0325566',
        text: 'Do your ToDo List today at 6AM GMT',
        completed: false
      },
      {
        _id: '0457874',
        text: 'Do your ToDo List today at 2AM GMT',
        completed: true
      },
      {
        _id: '4986104',
        text: 'Do your ToDo List today at 3AM GMT',
        completed: true
      }
    ];

    dashboard.changeCompleted = function(id) {
      for (var i = 0; i < dashboard.todoListData.length; i++) {
        if (id === dashboard.todoListData[i]._id) {
          dashboard.todoListData[i].completed = !dashboard.todoListData[i].completed;
        }
      }
    };

    dashboard.delToDoItem = function(id) {
      for (var i = 0; i < dashboard.todoListData.length; i++) {
        if (id === dashboard.todoListData[i]._id) {
          dashboard.todoListData.splice(i, 1);
        }
      }
    };

    dashboard.addToDoItem = function(item) {
      var id = function() {
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

      item._id = id();

      dashboard.todoListData.push(item);
    };

    element = $compile(element)(dashboard);
  }));

  it("should have an isolated scope with listed properties", function () {
    var siolated
  });
});
