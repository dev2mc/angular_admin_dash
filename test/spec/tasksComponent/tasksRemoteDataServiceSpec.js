'use strict';

describe('tasksComponent: service: tasksRemoteDataService - ', function() {
  var tasksRemoteDataService, httpBackend, dummyTasksData;

  beforeEach(module('angularDashboardApp'));

  beforeEach(inject(function(_tasksRemoteDataService_, $httpBackend) {
    tasksRemoteDataService = _tasksRemoteDataService_;
    httpBackend = $httpBackend;
  }));

  beforeEach(function() {
    dummyTasksData = [
      {
        _id: '4821307',
        name: 'Item 1',
        tag: 'work',
        description: 'Hire Baraa Bilal shopping as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      },
      {
        _id: '2656382',
        name: 'Item 2',
        tag: 'entertainment',
        description: 'Hire Baraa shopping Bilal work as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: true
      },
      {
        _id: '4755882',
        name: 'Item 3',
        tag: 'work',
        description: 'Hire Baraa Bilal entertainment as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      },
      {
        _id: '5667210',
        name: 'Item 4',
        tag: 'shopping',
        description: 'Hire Baraa work Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      },
      {
        _id: '3306098',
        name: 'Item 5',
        tag: 'work',
        description: 'Hire Baraa Bilal as CEO for home Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: true
      },
      {
        _id: '4707922',
        name: 'Item 6',
        tag: 'home',
        description: 'Hire Baraa Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      },
      {
        _id: '7017712',
        name: 'Item 7',
        tag: 'shopping',
        description: 'Hire Baraa work Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      },
      {
        _id: '5821090',
        name: 'Item 8',
        tag: 'work',
        description: 'Hire Baraa Bilal as CEO for home Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: true
      },
      {
        _id: '1195574',
        name: 'Item 9',
        tag: 'home',
        description: 'Hire Baraa Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      }
    ];
  });

  it('getTasks() function should fetch and pass whole collection array which is equal to dummyTasksData', function() {
    httpBackend.expectGET('https://api.mongolab.com/api/1/databases/angjsbyexmpl/collections/tasks?apiKey=wYOXfeNqx8m2P7fxATUeF4QSU7qoC9RT').respond(dummyTasksData);

    tasksRemoteDataService.getTasks().then(function(data) {
      expect(angular.equals(data, dummyTasksData)).toBeTruthy();
    });
    httpBackend.flush();
  });

  it('getSingleTask() function should fetch and pass taskItem with particular id', function() {
    var expectedItem = {
      _id: '4821307',
      name: 'Item 1',
      tag: 'work',
      description: 'Hire Baraa Bilal shopping as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
      favorite: false
    };

    var id = 4821307;

    httpBackend.expectGET('https://api.mongolab.com/api/1/databases/angjsbyexmpl/collections/tasks/' + id +'?apiKey=wYOXfeNqx8m2P7fxATUeF4QSU7qoC9RT').respond({
        _id: '4821307',
        name: 'Item 1',
        tag: 'work',
        description: 'Hire Baraa Bilal shopping as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
    });

    tasksRemoteDataService.getSingleTask().then(function(response) {
      expect(response).toEqual(expectedItem);
    });
  });

  it('addTask() function should accept parameter "task" and send new item to remote collection', function() {
    var newItem = {
      _id: '7611711',
      name: 'Item new',
      tag: 'work',
      description: 'Hire Baraa Bilal shopping as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
      favorite: true
    };

    httpBackend.whenPOST('ttps://api.mongolab.com/api/1/databases/angjsbyexmpl/collections/tasks?apiKey=wYOXfeNqx8m2P7fxATUeF4QSU7qoC9RT', newItem).respond({
      _id: '7611711',
      name: 'Item new',
      tag: 'work',
      description: 'Hire Baraa Bilal shopping as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
      favorite: true
    });

    tasksRemoteDataService.addTask(newItem).then(function(response) {
      expect(response).toEqual(newItem);
    });

  });

  it('removeTask() function should accept id and send delete request to remote server with this id in order to delete item with provided id, then it should return a promise with removed item', function() {
    var expectedItem = {
      _id: '4821307',
      name: 'Item 1',
      tag: 'work',
      description: 'Hire Baraa Bilal shopping as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
      favorite: false
    };

    var id = 4821307;

    httpBackend.expectDELETE('https://api.mongolab.com/api/1/databases/angjsbyexmpl/collections/tasks/' + id +'?apiKey=wYOXfeNqx8m2P7fxATUeF4QSU7qoC9RT').respond({
        _id: '4821307',
        name: 'Item 1',
        tag: 'work',
        description: 'Hire Baraa Bilal shopping as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
    });
    tasksRemoteDataService.removeTask(id).then(function(response) {
      expect(response).toEqual(expectedItem);
    });
  });

  it('updateTask() function should accept new item data and id and send those to remote server then it should return a promise with updated item', function() {
    var sentItem = {
      _id: '4821307',
      name: 'Item 1',
      tag: 'work',
      description: 'Hire Baraa Bilal shopping as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
      favorite: false
    };

    var id = 4821307;

    httpBackend.expectPUT('https://api.mongolab.com/api/1/databases/angjsbyexmpl/collections/tasks/' + id +'?apiKey=wYOXfeNqx8m2P7fxATUeF4QSU7qoC9RT', sentItem).respond({
        _id: '4821307',
        name: 'Item 1',
        tag: 'work',
        description: 'Hire Baraa Bilal shopping as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
    });

    tasksRemoteDataService.updateTask(sentItem, id).then(function(response) {
      expect(response).toEqual(sentItem);
    });
  });

});