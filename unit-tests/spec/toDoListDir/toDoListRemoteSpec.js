'use strict';

describe('toDoList: service: toDoListRemote - ', function () {
  var toDoListRemote, httpBackend, dummyToDoData;

  beforeEach(module('angularDashboardApp'));

  beforeEach(inject(function(_toDoListRemote_, $httpBackend) {
    toDoListRemote = _toDoListRemote_;
    httpBackend = $httpBackend;
  }));

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

  it('getAllToDo() function should fetch and pass whole collection array which is equal to dummyToDoData', function () {
    httpBackend.expectGET('https://api.mlab.com/api/1/databases/angjsbyexmpl/collections/todo?apiKey=wYOXfeNqx8m2P7fxATUeF4QSU7qoC9RT').respond(dummyToDoData);

    toDoListRemote.getAllToDo().then(function(data) {
      expect(angular.equals(data, dummyToDoData)).toBeTruthy();
    });
    httpBackend.flush();
  });

  it('addToDo() function should accept parameter "todo" and send new item to remote collection', function () {
    var newToDo = {
      _id: '0909090',
      text: 'add new todo item to doto collection',
      completed: false
    };

    httpBackend.expectPOST('https://api.mlab.com/api/1/databases/angjsbyexmpl/collections/todo?apiKey=wYOXfeNqx8m2P7fxATUeF4QSU7qoC9RT', newToDo).respond({
      _id: '0909090',
      text: 'add new todo item to doto collection',
      completed: false
    });

    toDoListRemote.addToDo(newToDo).then(function(response) {
      expect(response).toEqual(newToDo);
    });

    httpBackend.flush();
  });

  it('removeToDo() function should accept id and send delete request to remote server with this id in order to delete item with provided id, then it should return a promise with removed item', function () {
    var expectedItem = {
      _id: '0909090',
      text: 'add new todo item to doto collection',
      completed: false
    };

    var id = '0909090';

    httpBackend.expectDELETE('https://api.mlab.com/api/1/databases/angjsbyexmpl/collections/todo/' + id + '?apiKey=wYOXfeNqx8m2P7fxATUeF4QSU7qoC9RT').respond({
      _id: '0909090',
      text: 'add new todo item to doto collection',
      completed: false
    });

    toDoListRemote.removeToDo(id).then(function(response) {
      expect(response).toEqual(expectedItem);
    });

    httpBackend.flush();
  });

  it('updateToDo() function should accept new item data and id and send those to remote server then it should return a promise with updated item', function () {
    var sentItem = {
      _id: '0909090',
      text: 'add new todo item to doto collection',
      completed: false
    };

    var id = '0909090';

    httpBackend.expectPUT('https://api.mlab.com/api/1/databases/angjsbyexmpl/collections/todo/' + id +'?apiKey=wYOXfeNqx8m2P7fxATUeF4QSU7qoC9RT', sentItem).respond({
      _id: '0909090',
      text: 'add new todo item to doto collection',
      completed: false
    });

    toDoListRemote.updateToDo(sentItem, id).then(function(response) {
      expect(response).toEqual(sentItem);
    });

    httpBackend.flush();
  });
});
