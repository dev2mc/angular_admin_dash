'use strict';

describe('tasksComponent: controller: tasksComponentCtrl - ', function() {

  var tasksComponentCtrl, scope, uibModal, tasksRemoteDataService, dummyTasksData;

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

  beforeEach(function() {
    var mocktasksRemoteDataService = {};
    module('angularDashboardApp', function($provide) {
      $provide.value('tasksRemoteDataService', mocktasksRemoteDataService);
    });

    inject(function($q) {
      mocktasksRemoteDataService.data = dummyTasksData;

      mocktasksRemoteDataService.getTasks = function() {
        var defer = $q.defer();
        var response = mocktasksRemoteDataService.data;
        defer.resolve(response);
        return defer.promise;
      };

      mocktasksRemoteDataService.getSingleTask = function(id) {
        var taskItem;
        var defer = $q.defer();
        var response = {};
        for (var i = 0; i < mocktasksRemoteDataService.data.length - 1; i++) {
          if (mocktasksRemoteDataService.data[i]._id === id) {
            taskItem = mocktasksRemoteDataService.data[i];
          }
        }
        response = taskItem;
        defer.resolve(response);
        return defer.promise;
      };

      mocktasksRemoteDataService.addTask = function(task) {
        var defer = $q.defer();
        var response = {};
        mocktasksRemoteDataService.data.push(task);
        response = task;
        defer.resolve(response);
        return defer.promise;
      };

      mocktasksRemoteDataService.removeTask = function(id) {
        var taskItem;
        var response = {};

        var defer = $q.defer();
        for (var i = 0; i < mocktasksRemoteDataService.data.length - 1; i++) {
          if (mocktasksRemoteDataService.data[i]._id === id) {
            taskItem = mocktasksRemoteDataService.data.splice(i, 1);
          }
        }
        response = taskItem;
        defer.resolve(response);
        return defer.promise;
      };

      mocktasksRemoteDataService.updateTask = function(data, id) {
        var defer = $q.defer();
        var response = {};
        for (var i = 0; i < mocktasksRemoteDataService.data.length - 1; i++) {
          if (mocktasksRemoteDataService.data[i]._id === id) {
            mocktasksRemoteDataService.data[i] = data;
          }
        }
        response = data;
        defer.resolve(response);
        return defer.promise;
      };

    });
  });


  beforeEach(inject(function($controller, $rootScope, _$uibModal_, _tasksRemoteDataService_) {
    scope = $rootScope.$new();
    uibModal = _$uibModal_;
    tasksRemoteDataService = _tasksRemoteDataService_;
    tasksComponentCtrl = $controller('tasksComponentCtrl', {
      $scope: scope,
      $uibModal: uibModal,
      tasksRemoteDataService: tasksRemoteDataService
    });
    scope.$apply();
  }));

  describe('scope.init() function execution: ', function() {
    it('should invoke $scope.createTagsArrTest() function', function() {
      spyOn(scope, 'createTagsArrTest').and.callThrough();
      scope.init();
      scope.$apply();
      expect(scope.createTagsArrTest).toHaveBeenCalled();
    });

    it('should invoke $scope.getTasksArr() function', function() {
      spyOn(scope, 'getTasksArr');
      scope.init();
      scope.$apply();
      expect(scope.getTasksArr).toHaveBeenCalled();
    });

    it('should invoke $scope.checkActiveTag() function with a parameter 0', function() {
      spyOn(scope, 'checkActiveTag');
      scope.init();
      scope.$apply();
      expect(scope.checkActiveTag).toHaveBeenCalledWith(0);
    });
  });


  describe('$scope.getTasksArr() function execution: ', function() {
    it('should invoke tasksRemoteDataService.getTasks() function', function() {
      spyOn(tasksRemoteDataService, 'getTasks').and.callThrough();
      scope.getTasksArr();
      scope.$apply();
      expect(tasksRemoteDataService.getTasks).toHaveBeenCalled();
    });

    describe('tasksRemoteDataService.getTasks method: ', function() {
      it('should save fetched data to $scope.tasksItems which equal to tasksArray array', function() {
        scope.tasksItems = [];
        var tasksArray = dummyTasksData;
        scope.getTasksArr();
        scope.$apply();
        expect(scope.tasksItems).toEqual(tasksArray);
      });

      it('should invoke $scope.randomColor() function', function() {
        spyOn(scope, 'randomColor');
        scope.getTasksArr();
        scope.$apply();
        expect(scope.randomColor).toHaveBeenCalled();
      });
    });
  });

  describe('$scope.addTask() function execution: ', function() {
    var newTestTaskItem;

    beforeEach(function() {
      newTestTaskItem = {
        name: 'testName',
        tag: 'testTag',
        description: 'test description',
        favorite: false
      };
    });

    it('should invoke $scope.genRandomNumb() function', function() {
      spyOn(scope, 'genRandomNumb');
      scope.addTask(newTestTaskItem);
      expect(scope.genRandomNumb).toHaveBeenCalled();
    });

    it('should add randomly generated _id property to newTestTaskItem object (using $scope.genRandomNumb() function)', function() {
      scope.addTask(newTestTaskItem);
      expect(newTestTaskItem._id).toBeDefined();
      expect(typeof newTestTaskItem._id).toEqual('string');
      expect(newTestTaskItem._id.length).toEqual(7);
    });

    it('randomly generated newTestTaskItem _id property should be a string', function() {
      scope.addTask(newTestTaskItem);
      expect(typeof newTestTaskItem._id).toEqual('string');
    });

    it('randomly generated newTestTaskItem _id property should be have length of 7 symbols', function() {
      scope.addTask(newTestTaskItem);
      expect(newTestTaskItem._id.length).toEqual(7);
    });

    it('should invoke tasksRemoteDataService.addTask() function with newTaskItem parameter', function() {
      spyOn(tasksRemoteDataService, 'addTask').and.callThrough();
      scope.addTask(newTestTaskItem);
      scope.$apply();
      expect(tasksRemoteDataService.addTask).toHaveBeenCalledWith(newTestTaskItem);
    });

    it('tasksRemoteDataService.addTask() should push new item to $scope.tasksItems array', function() {
      var tasksOldArrLength = dummyTasksData.length;
      scope.addTask(newTestTaskItem);
      var tasksNewArrLength = scope.tasksItems.length;
      scope.$apply();
      expect(tasksOldArrLength).not.toEqual(tasksNewArrLength);
    });

    it('new item in $scope.tasksItems should contain defined "_id" property', function() {
      scope.addTask(newTestTaskItem);
      var tasksItemsLastItemInd = scope.tasksItems.length - 1;
      scope.$apply();
      expect(scope.tasksItems[tasksItemsLastItemInd]._id).toBeDefined();
    });

    it('new item in $scope.tasksItems should contain other properties similar to ones in newTestTaskItem', function() {
      scope.addTask(newTestTaskItem);
      var tasksItemsLastItemInd = scope.tasksItems.length -1;
      var addedItem = scope.tasksItems[tasksItemsLastItemInd];
      scope.$apply();
      expect(addedItem.name).toEqual(newTestTaskItem.name);
      expect(addedItem.tag).toEqual(newTestTaskItem.tag);
      expect(addedItem.description).toEqual(newTestTaskItem.description);
      expect(addedItem.favorite).toEqual(newTestTaskItem.favorite);
    });

    it('should invoke $scope.randomColor() function', function() {
      spyOn(scope, 'randomColor');
      scope.addTask(newTestTaskItem);
      scope.$apply();
      expect(scope.randomColor).toHaveBeenCalled();
    });
  });

  describe('$scope.addTasksToDel() function execution: ', function() {
    var id;

    beforeEach(function() {
      id = 342134234523;
    });

    it('$scope.tasksItemsToDel array should be defined', function() {
      expect(scope.taskItemsToDel).toBeDefined();
    });

    it('$scope.tasksItemsToDel array should be defined as an empty array', function() {
      expect(scope.taskItemsToDel).toEqual([]);
    });

    it('$scope.addTasksToDel() should accept "id" parameter', function() {
      spyOn(scope, 'addTasksToDel');
      scope.addTasksToDel(id);
      expect(scope.addTasksToDel).toHaveBeenCalledWith(id);
    });

    it('$scope.addTasksToDel() should add provided id to $scope.taskItemsToDel array if the id is not present on this array', function() {
      scope.taskItemsToDel = [21, 32];
      scope.addTasksToDel(id);
      expect(scope.taskItemsToDel).toContain(id);
    });

    it('$scope.addTasksToDel() should remove provided id from $scope.taskItemsToDel array if it is present on the array', function() {
      scope.taskItemsToDel = [21, 32, 342134234523];
      scope.addTasksToDel(id);
      expect(scope.taskItemsToDel).not.toContain(342134234523);
    });
  });

  describe('$scope.removeTasks function execution: ', function() {
    it('tasksRemoteDataService.removeTask() function should not be called if $scope.taskItemsToDel array is undefined', function() {
      spyOn(tasksRemoteDataService, 'removeTask');
      scope.taskItemsToDel = undefined;
      scope.removeTasks();
      scope.$apply();
      expect(tasksRemoteDataService.removeTask).not.toHaveBeenCalled();
    });

    it('tasksRemoteDataService.removeTask() function should not be called if $scope.taskItemsToDel array is empty', function() {
      spyOn(tasksRemoteDataService, 'removeTask');
      scope.taskItemsToDel = [];
      scope.removeTasks();
      scope.$apply();
      expect(tasksRemoteDataService.removeTask).not.toHaveBeenCalled();
    });

    it('tasksRemoteDataService.removeTask() function should be called if $scope.taskItemsToDel array contains elements', function() {
      spyOn(tasksRemoteDataService, 'removeTask').and.callThrough();
      scope.taskItemsToDel = [3232, 43242, 342242];
      scope.removeTasks();
      scope.$apply();
      expect(tasksRemoteDataService.removeTask).toHaveBeenCalled();
    });

    describe('$scope.taskItemsToDel array: ', function() {
      var oldArr, firstTasksItem, firstTasksItemId, lastTasksItem, lastTasksItemId;

      beforeEach(function() {
        oldArr = scope.tasksItems;
        firstTasksItem = oldArr[0];
        firstTasksItemId = firstTasksItem._id;
        lastTasksItem = oldArr[oldArr.length - 1];
        lastTasksItemId = lastTasksItem._id;

        scope.taskItemsToDel = [firstTasksItemId, lastTasksItemId];
        scope.removeTasks();
        scope.$apply();
      });

      it('items with id\'s listed in $scope.taskItemsToDel array should be removed from $scope.tasksItems', function() {
        expect(scope.tasksItems).not.toContain(firstTasksItem);
        expect(scope.tasksItems).not.toContain(lastTasksItem);
      });

      it('elements of $scope.taskItemsToDel should be removed after successful $scope.removeTasks() execution', function() {
        expect(scope.taskItemsToDel).toEqual([]);
      });
    });
  });

  describe('$scope.changeFavorite() function execution: ', function() {
    var middleElemInd, middleElem, middleElemId;

    beforeEach(function() {
      scope.tasksItems = dummyTasksData;
      middleElemInd = Math.round(scope.tasksItems.length / 2);
      middleElem = scope.tasksItems[middleElemInd];
      middleElemId = middleElem._id;
    });

    it('tasksRemoteDataService.updateTask() function should be invoked with "item" and "id" parameters', function() {
      spyOn(tasksRemoteDataService, 'updateTask').and.callThrough();
      scope.changeFavorite(middleElemId);
      scope.$apply();
      expect(tasksRemoteDataService.updateTask).toHaveBeenCalledWith(middleElem, middleElemId);
    });

    it('tasksRemoteDataService.updateTask() function should not be called when "item" parameter is not defined', function() {
      middleElemId = '101010bad0id0sOmEGArBaGe84392';
      middleElem = undefined;
      spyOn(tasksRemoteDataService, 'updateTask').and.callThrough();
      scope.changeFavorite(middleElemId);
      scope.$apply();
      expect(tasksRemoteDataService.updateTask).not.toHaveBeenCalled();
    });

    it('tasksRemoteDataService.updateTask() function should change property "favorite" of the item on $scope.tasksItems array to opposite boolean value', function() {
      var oldFavValue = middleElem.favorite;
      scope.changeFavorite(middleElemId);
      var newFavValue = scope.tasksItems[middleElemInd].favorite;
      scope.$apply();
      expect(oldFavValue).not.toEqual(newFavValue);
    });

  });

  describe('$scope.randomColor() function execution: ', function() {
    it('$scope.taskItemBgColorsArr array should be defined', function() {
      expect(scope.taskItemBgColorsArr).toBeDefined();
    });

    it('$scope.taskItemBgColorsArr array should contain properties which represent classes partials', function() {
      var bgColsArr =  ['ship-cove', 'cornflower-blue', 'saffron-mango', 'wisteria', 'sunset-orange', 'bermuda', 'sunglow', 'java', 'mantis'];
      expect(scope.taskItemBgColorsArr).toEqual(bgColsArr);
    });

    it('$scope.objOfColors object should be defined and should be an object', function() {
      var typeOfObjOfColors = typeof scope.objOfColors;
      expect(scope.objOfColors).toBeDefined();
      expect(typeOfObjOfColors).toEqual('object');
    });

    it('keys of $scope.objOfColors object should be equal to _id properties of elements of $scope.tasksItems array', function() {
      scope.randomColor();
      var objOfColorsKeys = Object.keys(scope.objOfColors);
      var idsOfTasksItems = [];
      scope.tasksItems.forEach(function(v, i) {
        idsOfTasksItems[i] = v._id;
      });
      expect(objOfColorsKeys).toEqual(idsOfTasksItems);
    });
  });

  describe('Tags generation functionality: ', function() {
    it('initial value of $scope.filteredTag should be "all"', function() {
      expect(scope.filteredTag).toEqual('all');
    });

    it('$scope.tasksTags array should be defiend and should be an array', function() {
      expect(scope.tasksTags).toBeDefined();
      expect(Array.isArray(scope.tasksTags)).toBeTruthy();
    });

    describe('$scope.getAllTasksTags() function execution: ', function() {
      it('$scope.getAllTasksTags() function should add "all" element to $scope.tasksTags as the first item', function() {
        scope.tasksTags = [];
        scope.getAllTasksTags();
        expect(scope.tasksTags).toContain('all');
        expect(scope.tasksTags[0]).toEqual('all');
      });

      it('$scope.getAllTasksTags() function should fill $scope.tasksTags array with tags derived from $scope.tasksTags elements', function() {
        scope.tasksTags = [];
        scope.getAllTasksTags();
        expect(scope.tasksTags.length).toBeGreaterThan(1);
      });

      it('$scope.getAllTasksTags() function should be executed when $scope.tasksItems array changes', function() {
        var newTestTaskItem = {
          name: 'testName',
          tag: 'testTag',
          description: 'test description',
          favorite: false
        };

        spyOn(scope, 'getAllTasksTags');
        scope.tasksItems.push(newTestTaskItem);
        scope.$apply();
        expect(scope.getAllTasksTags).toHaveBeenCalled();
      });
    });

    it('$scope.assignTag() function should assign a chosen tag to $scope.filteredTag variable according to index of the element', function() {
      scope.tasksTags = ['testTag0', 'testTag1', 'testTag2', 'testTag3', 'testTag4'];
      scope.assignTag(3);
      expect(scope.filteredTag).toEqual('testTag3');
    });

    it('$scope.tagsArrTest array should be defined and should be an array', function() {
      expect(scope.tagsArrTest).toBeDefined();
      expect(Array.isArray(scope.tagsArrTest)).toBeTruthy();
    });

    describe('$scope.createTagsArrTest() function execution: ', function() {
      var filteredTagValueInd, filteredTagValueIndOld, filteredTagValueIndNew;

      beforeEach(function() {
        filteredTagValueInd = 3;
        filteredTagValueIndOld = 3;
        filteredTagValueIndNew = 0;
        scope.tagsArrTest = [];
        scope.tasksTags = ['testTag0', 'testTag1', 'testTag2', 'testTag3', 'testTag4'];
        scope.filteredTag = 'testTag3';
        scope.createTagsArrTest();
      });

      it('$scope.createTagsArrTest() function should fill $scope.tagsArrTest with number of elements equal to $scope.tasksTags.length', function() {
        expect(scope.tagsArrTest.length).toEqual(scope.tasksTags.length);
      });

      it('$scope.createTagsArrTest() function should assign "true" boolean value to an element of $scope.tagsArrTest which has the same index as the element of $scope.tasksTags array and value of which is equal to $scope.filteredTag', function() {
        expect(scope.tagsArrTest[filteredTagValueInd]).toBeTruthy();
      });

      it('$scope.createTagsArrTest() function should change boolean value of $scope.tagsArrTest array element to opposite when $scope.filteredTag is changed', function() {
        expect(scope.tagsArrTest[filteredTagValueIndOld]).toBeTruthy();
        expect(scope.tagsArrTest[filteredTagValueIndNew]).toBeFalsy();

        scope.filteredTag = 'testTag0';
        scope.createTagsArrTest();

        expect(scope.tagsArrTest[filteredTagValueIndOld]).toBeFalsy();
        expect(scope.tagsArrTest[filteredTagValueIndNew]).toBeTruthy();
      });
    });

    describe('$scope.checkActiveTag() function execution: ', function() {
      it('$scope.checkActiveTag() function should assign "true" boolean value to element of $scope.tagsArrTest array with given index', function() {
        scope.tagsArrTest = [false, false, false, false, true];
        var indTurnedToTrue = 0;
        var indTurnedToFalse = 4;
        scope.checkActiveTag(0);
        expect(scope.tagsArrTest[indTurnedToTrue]).toBeTruthy();
        expect(scope.tagsArrTest[indTurnedToFalse]).toBeFalsy();
      });
    });
  });

  describe('$scope.toggleDelTasksVisible() function execution: ', function() {
    it('$scope.toggleDelTasksVisible() function, when invoked, should change boolean value of $scope.delTasksItemsVisible to opposite', function() {
      scope.delTasksItemsVisible = false;
      scope.toggleDelTasksVisible();
      expect(scope.delTasksItemsVisible).toBeTruthy();
    });
  });

  describe('bootstrap modal window functionality: ', function() {
    it('$scope.open() method should be defined', function() {
      expect(scope.open).toBeDefined();
    });

    it('$scope.modWindParamsObj should be defined and should be an object', function() {
      expect(scope.modWindParamsObj).toBeDefined();
      expect(typeof scope.modWindParamsObj).toEqual('object');
    });

    it('$scope.open() method should invoke $uibModal.open() function with a given object ($scope.modWindParamsObj) as a parameter', function() {
       scope.modWindParamsObj = {
        animation: true,
        templateUrl: '../components/tasksComponent/newTaskModalWind.html',
        controller: 'newTaskModalInstanceWindCtrl',
        resolve: {
          addTask: function () {
            return scope.addTask;
          },
          tasksTags: function() {
            return scope.tasksTags;
          }
        }
      };
      spyOn(uibModal, 'open');
      scope.open();
      expect(uibModal.open).toHaveBeenCalledWith(scope.modWindParamsObj);
    });
  });
});