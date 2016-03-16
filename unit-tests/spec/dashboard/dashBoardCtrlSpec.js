'use strict';

describe('dashboard: controller: dashBoardCtrl - ', function () {
  var toDoListRemote, dummyToDoData, scope;

  beforeEach(module('angularDashboardApp'));

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

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    toDoListRemote = {};

    inject(function($q) {
      toDoListRemote.data = dummyToDoData;

      toDoListRemote.getAllToDo = function() {
        var defer = $q.defer();
        var response = toDoListRemote.data;
        defer.resolve(response);
        return defer.promise;
      };

      toDoListRemote.addToDo = function(todo) {
        var defer = $q.defer();
        var response = {};
        toDoListRemote.data.push(todo);
        response = todo;
        defer.resolve(response);
        return defer.promise;
      };

      toDoListRemote.removeToDo = function(id) {
        var todoItem;
        var response = {};

        var defer = $q.defer();
        for (var i = 0; i < toDoListRemote.data.lenth - 1; i++) {
          if (toDoListRemote.data[i]._id === id) {
            todoItem = toDoListRemote.data.splice(i, 1);
          }
        }
        response = todoItem;
        defer.resolve(response);
        return defer.promise;
      };

      toDoListRemote.updateToDo = function(data, id) {
        var defer = $q.defer();
        var response = {};
        for (var i = 0; i < toDoListRemote.data.lenth - 1; i++) {
          if (toDoListRemote.data[i]._id === id) {
            toDoListRemote.data[i] = data;
          }
        }
        response = data;
        defer.resolve(response);
        return defer.promise;
      };
    });

    $controller('dashboardCtrl', {
      $scope: scope,
      toDoListRemote: toDoListRemote
    });
    scope.$apply();
  }));

  describe('init() function execution: ', function () {
    it('should invoke getTodoData() function', function () {
      spyOn(scope, 'getTodoData');
      scope.init();
      expect(scope.getTodoData).toHaveBeenCalled();
    });
  });

  it('todoListData variable should be defined on controller and should be an array', function () {
    expect(scope.todoListData).toBeDefined();
    expect(Array.isArray(scope.todoListData)).toBeTruthy();
  });

  it('genRandomNumb() function should return a string with length of 7 characters', function () {
    var str = '';
    str = scope.genRandomNumb();
    expect(str.length).toEqual(7);
  });

  describe('scope.changeCompleted() function execution: ', function () {
    var middleElemInd, middleElem, middleElemId, completedOld;

    beforeEach(function () {
      scope.todoListData = dummyToDoData;
      middleElemInd = Math.round(scope.todoListData.length / 2);
      middleElem = scope.todoListData[middleElemInd];
      middleElemId = middleElem._id;
      completedOld = angular.copy(middleElem.completed);
    });

    it('toDoListRemote.updateToDo() function should be invoked with parameters id and todoItem', function () {
      spyOn(toDoListRemote, 'updateToDo').and.callThrough();
      scope.changeCompleted(middleElemId);

      var updMiddleElem = angular.copy(middleElem);
      updMiddleElem.completed = !updMiddleElem.completed;
      expect(toDoListRemote.updateToDo).toHaveBeenCalledWith(updMiddleElem, middleElemId);
    });

    it('updated element should have opposite value of completed property', function () {
      scope.changeCompleted(middleElemId);
      scope.$apply();
      var completedNew = middleElem.completed;
      expect(completedNew).not.toEqual(completedOld);
    });
  });

  describe('scope.delToDoItem() function execution: ', function () {
    var middleElemInd, middleElem, middleElemId;

    beforeEach(function () {
      scope.todoListData = dummyToDoData;
      middleElemInd = Math.round(scope.todoListData.length / 2);
      middleElem = scope.todoListData[middleElemInd];
      middleElemId = middleElem._id;
    });

    it('scope.delToDoItem() function should invoke toDoListRemote.removeToDo() function with id parameter', function () {
      spyOn(toDoListRemote, 'removeToDo').and.callThrough();
      scope.delToDoItem(middleElemId);
      expect(toDoListRemote.removeToDo).toHaveBeenCalledWith(middleElemId);
    });

    it('scope.todoListData array should be decreased on one element after scope.delToDoItem() function  invokation', function () {
      var oldTodoDataLength = scope.todoListData.length;
      scope.delToDoItem(middleElemId);
      scope.$apply();
      expect(oldTodoDataLength - 1).toEqual(scope.todoListData.length);
    });
  });

  describe('scope.addToDoItem() function execution: ', function () {
    var newItem;

    beforeEach(function () {
      newItem = {
        text: 'test item',
        completed: false
      };
    });

    it('should invoke toDoListRemote.addToDo() function with parameter item', function () {
      spyOn(toDoListRemote, 'addToDo').and.callThrough();
      scope.addToDoItem(newItem);
      expect(toDoListRemote.addToDo).toHaveBeenCalledWith(newItem);
    });

    it('should add _id property to newItem variable', function () {
      scope.addToDoItem(newItem);
      scope.$apply();
      expect(newItem._id).toBeDefined();
    });

    it('should add newItem to scope.todoListData array', function () {
      scope.addToDoItem(newItem);
      scope.$apply();
      expect(scope.todoListData[scope.todoListData.length - 1]).toEqual(newItem);
    });
  });
});
