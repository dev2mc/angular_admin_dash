'use strict';
angular.module('angularDashboardApp')
  .controller('tasksComponentCtrl', function($scope, $uibModal, $log, $http, $q, tasksRemoteDataService) {
    //------------------
    var getTasksArr = function() {
      tasksRemoteDataService.getTasks().success(function(data) {
        $scope.tasksItems = data;
        $scope.randomColor();
        console.log($scope.tasksItems);
      });
    };

    $scope.addTask = function(newItem) {
      tasksRemoteDataService.addTask(newItem).success(function(addedTask) {
        console.log(addedTask);
        $scope.tasksItems.push(addedTask);
      });
    };

    //initial array of task__item's id to delete
    var taskItemsToDel = [];

    //function for adding items for deletion to array taskItemsToDel
    $scope.addTasksToDel = function(id) {
      if (taskItemsToDel.indexOf(id) === -1) {
        taskItemsToDel.push(id);
      } else {
        var itemInd = taskItemsToDel.indexOf(id);
        taskItemsToDel.splice(itemInd, 1);
      }
    };

    // function for removing tasks from tasksItems array
    $scope.removeTasks = function() {
      //check if taskItemsToDel array is defined and is not empty
      if (typeof taskItemsToDel !== 'undefined' && taskItemsToDel.length > 0) {
        angular.forEach(taskItemsToDel, function(id, ind, arr) {
          var prom = tasksRemoteDataService.removeTask(id);
          prom.success(function() {
            for (var i = $scope.tasksItems.length - 1; i >= 0; i--) {
                if ($scope.tasksItems[i]._id.$oid === id) {
                  $scope.tasksItems.splice(i, 1);
                }
            }
            arr.splice(ind, 1);
          });
        });
      }
    };

    //check or uncheck favorite icon for task__item
    $scope.changeFavorite = function(id) {
      var item;
      var itemInd;
      angular.forEach($scope.tasksItems, function(v, i){
        if (v._id.$oid === id) {
          item = angular.copy(v);
          itemInd = i;
        }
      });
      if (item !== undefined) {
        item.favorite = !item.favorite;
        tasksRemoteDataService.updateTask(item, id).success(function(){
          $scope.tasksItems[itemInd].favorite = !$scope.tasksItems[itemInd].favorite;
        });
      }
    };
    //------------------

    //array of color for tasks__item background
    var taskItemBgColorsArr = ['ship-cove', 'cornflower-blue', 'saffron-mango', 'wisteria', 'sunset-orange', 'bermuda', 'sunglow', 'java', 'mantis'];

    //object for storing random background values for tasks items
    $scope.objOfColors = {};

    // function for randomizing background color of tasks items
    $scope.randomColor = function() {
      angular.forEach($scope.tasksItems, function(value) {
        var taskId = value._id.$oid;
        var idInObj = false;
        for (var key in $scope.objOfColors) {
          if (key === taskId) {
            idInObj = true;
            break;
          }
        }
        if (idInObj === false) {
          var colInd = Math.floor((Math.random() * taskItemBgColorsArr.length) + 0);
          $scope.objOfColors[taskId] = taskItemBgColorsArr[colInd];
        }
      });
    };
    //-------------------------------------------------------

    //set initial tag for filter
    $scope.filteredTag = 'all';

    //array with all tags used in this view
    $scope.tasksTags = [];

    //function for getting all tasks tags
    var getAllTasksTags = function() {
      $scope.tasksTags = ['all'];
      angular.forEach($scope.tasksItems, function(v) {
        if ($scope.tasksTags.indexOf(v.tag) === -1) {
          $scope.tasksTags.push(v.tag);
        }
      });
    };

    //function for determining active tag
    $scope.checkActiveTag = function(index) {
      angular.forEach($scope.tagsArrTest, function(v, i, a) {
        a[i] = false;
      });
      $scope.tagsArrTest[index] = true;
    };

    //update tasksTags array if tasksItems changed
    $scope.$watchCollection('tasksItems', function() {
      getAllTasksTags();
    });

    //function for assigning tag
    $scope.assignTag = function(index) {
      $scope.filteredTag = $scope.tasksTags[index];
    };

    $scope.tagsArrTest = [];

    var createTagsArrTest = function () {
      angular.forEach($scope.tasksTags, function(v, i) {
        if (v === $scope.filteredTag) {
          $scope.tagsArrTest[i] = true;
        } else {
          $scope.tagsArrTest[i] = false;
        }
      });
    };

    //variable for changing visibility of delete-items controls
    $scope.delTasksItemsVisible = false;

    //toggling visibility
    $scope.toggleDelTasksVisible = function() {
      $scope.delTasksItemsVisible = !$scope.delTasksItemsVisible;
    };


//---------------------------------------------------------------
//---------------------------------------------------------------
  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '../components/tasksComponent/newTaskModalWind.html',
      controller: 'newTaskModalInstanceWindCtrl',
      size: size,
      resolve: {
        addTask: function () {
          return $scope.addTask;
        },
        tasksTags: function() {
          return $scope.tasksTags;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
//---------------------------------------------------------------
//---------------------------------------------------------------
    var init = function() {
      createTagsArrTest();
      getTasksArr();
      $scope.checkActiveTag(0);
    };

    init();
  });