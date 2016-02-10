'use strict';

describe('Controller: tasksComponentCtrl', function() {
  var scope, $uibModal, tasksRemoteDataService;

  // beforeEach(module('angularDashboardApp'));

  beforeEach(function() {
    var mocktasksRemoteDataService = {};
    module('angularDashboardApp', function($provide) {
      $provide.value('tasksRemoteDataService', mocktasksRemoteDataService);
    });

    inject(function($q) {
      mocktasksRemoteDataService.data = [
        {
          _id: {
            $oid: '000001'
          },
          name: 'Item 1',
          tag: 'work',
          description: 'Hire Baraa Bilal shopping as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
          favorite: false
        },
        {
          _id: {
            $oid: '000002'
          },
          name: 'Item 2',
          tag: 'entertainment',
          description: 'Hire Baraa shopping Bilal work as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
          favorite: true
        },
        {
          _id: {
            $oid: '000003'
          },
          name: 'Item 3',
          tag: 'work',
          description: 'Hire Baraa Bilal entertainment as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
          favorite: false
        },
        {
          _id: {
            $oid: '000004'
          },
          name: 'Item 4',
          tag: 'shopping',
          description: 'Hire Baraa work Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
          favorite: false
        },
        {
          _id: {
            $oid: '000005'
          },
          name: 'Item 5',
          tag: 'work',
          description: 'Hire Baraa Bilal as CEO for home Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
          favorite: true
        },
        {
          _id: {
            $oid: '000006'
          },
          name: 'Item 6',
          tag: 'home',
          description: 'Hire Baraa Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
          favorite: false
        },
        {
          _id: {
            $oid: '000007'
          },
          name: 'Item 7',
          tag: 'shopping',
          description: 'Hire Baraa work Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
          favorite: false
        },
        {
          _id: {
            $oid: '000008'
          },
          name: 'Item 8',
          tag: 'work',
          description: 'Hire Baraa Bilal as CEO for home Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
          favorite: true
        },
        {
          _id: {
            $oid: '000009'
          },
          name: 'Item 9',
          tag: 'home',
          description: 'Hire Baraa Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
          favorite: false
        }
      ];

      mocktasksRemoteDataService.getTasks = function() {
        var defer = $q.defer();
        defer.resolve(this.data);
        return defer.promise;
      };

      mocktasksRemoteDataService.getSingleTask = function(id) {
        var taskItem;
        var defer = $q.defer();
        for (var i = 0; i < this.data.length - 1; i++) {
          if (this.data[i]._id.$oid === id) {
            taskItem = this.data[i];
          }
        }
        defer.resolve(taskItem);
        return defer.promise;
      };

      mocktasksRemoteDataService.addTask = function(task) {
        var defer = $q.defer();
        this.data.push(task);
        defer.resolve(task);
        return defer.promise;
      };

      mocktasksRemoteDataService.removeTask = function(id) {
        var taskItem;
        var defer = $q.defer();
        for (var i = 0; i < this.data.length - 1; i++) {
          if (this.data[i]._id.$oid === id) {
            taskItem = this.data.splice(i, 1);
          }
        }
        defer.resolve(taskItem);
        return defer.promise;
      };

      mocktasksRemoteDataService.updateTask = function(data, id) {
        var defer = $q.defer();
        for (var i = 0; i < this.data.length - 1; i++) {
          if (this.data[i]._id.$oid === id) {
            this.data[i] = data;
          }
        }
        defer.resolve(data);
        return defer.promise;
      };

    });
  });

  beforeEach(inject(function($controller, $rootScope, _$uibModal_, _tasksRemoteDataService_) {
    scope = $rootScope.$new();
    $uibModal = _$uibModal_;
    tasksRemoteDataService = _tasksRemoteDataService_;
    var  tasksComponentCtrl = $controller('tasksComponentCtrl',
      {
        $scope: scope,
        $uibModal: $uibModal,
        tasksRemoteDataService: tasksRemoteDataService
      }
    );
    scope.$apply();
  }));

  it('$scope.tasksItems should contain all items from remote server', function() {
    tasksComponentCtrl.init();
    expect(scope.tasksItems).toEqual([
        {
          _id: {
            $oid: '000001'
          },
          name: 'Item 1',
          tag: 'work',
          description: 'Hire Baraa Bilal shopping as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
          favorite: false
        },
        {
          _id: {
            $oid: '000002'
          },
          name: 'Item 2',
          tag: 'entertainment',
          description: 'Hire Baraa shopping Bilal work as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
          favorite: true
        },
        {
          _id: {
            $oid: '000003'
          },
          name: 'Item 3',
          tag: 'work',
          description: 'Hire Baraa Bilal entertainment as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
          favorite: false
        },
        {
          _id: {
            $oid: '000004'
          },
          name: 'Item 4',
          tag: 'shopping',
          description: 'Hire Baraa work Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
          favorite: false
        },
        {
          _id: {
            $oid: '000005'
          },
          name: 'Item 5',
          tag: 'work',
          description: 'Hire Baraa Bilal as CEO for home Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
          favorite: true
        },
        {
          _id: {
            $oid: '000006'
          },
          name: 'Item 6',
          tag: 'home',
          description: 'Hire Baraa Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
          favorite: false
        },
        {
          _id: {
            $oid: '000007'
          },
          name: 'Item 7',
          tag: 'shopping',
          description: 'Hire Baraa work Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
          favorite: false
        },
        {
          _id: {
            $oid: '000008'
          },
          name: 'Item 8',
          tag: 'work',
          description: 'Hire Baraa Bilal as CEO for home Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
          favorite: true
        },
        {
          _id: {
            $oid: '000009'
          },
          name: 'Item 9',
          tag: 'home',
          description: 'Hire Baraa Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
          favorite: false
        }
      ]);

  });
});