'use strict';

describe('dashboard: controller: dashBoardCtrl - ', function () {
  var dashCtrl, toDoListRemote, dummyToDoData;

  beforeEach(function () {
    dummyToDoData = [
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
  });

  beforeEach(function () {
    var mockToDoListRemote = {};

    module('angularDashboardApp', function($provide) {
      $provide.value('toDolistRemote', toDoListRemote);
    });

    inject(function($q) {
      mockToDoListRemote.data = dummyToDoData;

      mockToDoListRemote.getAllToDo = function() {
        var defer = $q.defer();
        var response = mockToDoListRemote.data;
        defer.resolve(response);
        return defer.promise;
      };

      mockToDoListRemote.addToDo = function(todo) {
        var defer = $q.defer();
        var response = {};
        mockToDoListRemote.data.push(todo);
        response = todo;
        defer.resolve(response);
        return defer.promise;
      };

      mockToDoListRemote.removeToDo = function(id) {
        var todoItem;
        var response = {};

        var defer = $q.defer();
        for (var i = 0; i < mockToDoListRemote.data.lenth - 1; i++) {
          if (mockToDoListRemote.data[i]._id === id) {
            todoItem = mockToDoListRemote.data.splice(i, 1);
          }
        }
        response = todoItem;
        defer.resolve(response);
        return defer.promise;
      };

      mockToDoListRemote.updateToDo = function(data, id) {
        var defer = $q.defer();
        var response = {};
        for (var i = 0; i < mockToDoListRemote.data.lenth - 1; i++) {
          if (mockToDoListRemote.data[i]._id === id) {
            mockToDoListRemote.data[i] = data;
          }
        }
        response = data;
        defer.resolve(response);
        return defer.promise;
      };
    });
  });

  beforeEach(inject(function($controller, _toDoListRemote_) {
    toDoListRemote = _toDoListRemote_;
    dashCtrl = $controller('dashboardCtrl', {
      toDoListRemote: toDoListRemote
    });
  }));

  describe('init() function execution: ', function () {
    it('should invoke getTodoData() function', function () {
      spyOn(dashCtrl, 'getTodoData');
      dashCtrl.init();
      expect(dashCtrl.getTodoData).toHaveBeenCalled();
    });
  });

  it('todoListData variable should be defined on controller and should be an array', function () {
    expect(dashCtrl.todoListData).toBeDefined();
    expect(Array.isArray(dashCtrl.todoListData)).toBeTruthy();
  });

  it('genRandomNumb() function should return a string with length of 7 characters', function () {
    var str = '';
    str = dashCtrl.genRandomNumb();
    expect(str.length).toEqual(7);
  });

  describe('changeCompleted() function execution: ', function () {
    var middleElemInd, middleElem, middleElemId;

    beforeEach(function () {
      dashCtrl.todoListData = dummyToDoData;
      middleElemInd = Math.round(dashCtrl.todoListData.length / 2);
      middleElem = dashCtrl.todoListData[middleElemInd];
      middleElemId = middleElem._id;
    });

    it('toDoListRemote.updateToDo() function should be invoked with parameters id and todoItem', function () {
      spyOn(toDoListRemote, 'updateToDo').and.callThrough();
      dashCtrl.changeCompleted(middleElemId);

      var updMiddleElem = angular.copy(middleElem);
      updMiddleElem.completed = !updMiddleElem.completed;
      expect(toDoListRemote.updateToDo).toHaveBeenCalledWith(updMiddleElem, middleElemId);
    });

  });

  describe('delToDoItem() function execution: ', function () {
    var middleElemInd, middleElem, middleElemId;

    beforeEach(function () {
      dashCtrl.todoListData = dummyToDoData;
      middleElemInd = Math.round(dashCtrl.todoListData.length / 2);
      middleElem = dashCtrl.todoListData[middleElemInd];
      middleElemId = middleElem._id;
    });

    // dashCtrl.todoListData = dummyToDoData;
    it('delToDoItem() function should invoke toDoListRemote.removeToDo() function with id parameter', function () {
      spyOn(toDoListRemote, 'removeToDo').and.callThrough();
      dashCtrl.delToDoItem(middleElemId);
      expect(toDoListRemote.removeToDo).toHaveBeenCalledWith(middleElemId);
    });
  });

  describe('addToDoItem() function execution: ', function () {
    var newItem;

    beforeEach(function () {
      newItem = {
        text: 'test item',
        completed: false
      };
    });

    it('should invoke toDoListRemote.addToDo() function with parameter item', function () {
      spyOn(toDoListRemote, 'addToDo').and.callThrough();
      dashCtrl.addToDoItem(newItem);
      expect(toDoListRemote.addToDo).toHaveBeenCalledWith(newItem);
    });

    it('should add _id property to newItem variable', function () {
      dashCtrl.addToDoItem(newItem);
      expect(newItem._id).toBeDefined();
    });
  });
});
