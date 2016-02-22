'use strict';
angular.module('angularDashboardApp')
  .controller('tasksComponentCtrl', function($scope, $uibModal, tasksRemoteDataService) {
    // var ctrl = this;
    //------------------
    $scope.getTasksArr = function() {
      tasksRemoteDataService.getTasks().then(function(data) {
        $scope.tasksItems = data;
        $scope.randomColor();
      }).catch(function(res) {
        $scope.errorMessOpen(res.status, res.data.message);
      });
    };

    $scope.genRandomNumb = function() {
      var idLength = 7;
      var numberStr = Math.floor((Math.random() * 10000000) + 1) + '';
      if (numberStr.length < idLength) {
        var diff = idLength - numberStr.length;
        for (var i = 1; i <= diff; i++) {
          numberStr = '0' + numberStr;
        }
      }
      return numberStr;
    };

    $scope.addTask = function(newItem) {
      newItem._id = $scope.genRandomNumb();
      tasksRemoteDataService.addTask(newItem).then(function(data) {
        $scope.tasksItems.push(data);
        $scope.randomColor();
      }).catch(function(res) {
        $scope.errorMessOpen(res.status, res.statusText);
      });
    };

    //initial array of task__item's id to delete
    $scope.taskItemsToDel = [];

    //function for adding items for deletion to array $scope.taskItemsToDel
    $scope.addTasksToDel = function(id) {
      if ($scope.taskItemsToDel.indexOf(id) === -1) {
        $scope.taskItemsToDel.push(id);
      } else {
        var itemInd = $scope.taskItemsToDel.indexOf(id);
        $scope.taskItemsToDel.splice(itemInd, 1);
      }
    };

    // function for removing tasks from tasksItems array
    $scope.removeTasks = function() {
      //check if $scope.taskItemsToDel array is defined and is not empty
      if (typeof $scope.taskItemsToDel !== 'undefined' && $scope.taskItemsToDel.length > 0) {
        angular.forEach($scope.taskItemsToDel, function(id, ind, arr) {
          var prom = tasksRemoteDataService.removeTask(id);
          prom.then(function() {
            for (var i = $scope.tasksItems.length - 1; i >= 0; i--) {
                if ($scope.tasksItems[i]._id === id) {
                  $scope.tasksItems.splice(i, 1);
                }
            }
            if ($scope.taskItemsToDel.length === 1) {
              $scope.taskItemsToDel = [];
            } else {
              arr.splice(ind, 1);
            }
          }).catch(function(res) {
              $scope.errorMessOpen(res.status, res.statusText);
            });
        });
      }
    };

    //check or uncheck favorite icon for task__item
    $scope.changeFavorite = function(id) {
      var item;
      var itemInd;
      angular.forEach($scope.tasksItems, function(v, i){
        if (v._id === id) {
          item = angular.copy(v);
          itemInd = i;
        }
      });
      if (item !== undefined) {
        item.favorite = !item.favorite;
        tasksRemoteDataService.updateTask(item, id).then(function(){
          $scope.tasksItems[itemInd].favorite = !$scope.tasksItems[itemInd].favorite;
        }).catch(function(res) {
            $scope.errorMessOpen(res.status, res.statusText);
          });
      }
    };
    //------------------

    //array of color for tasks__item background
    $scope.taskItemBgColorsArr = ['ship-cove', 'cornflower-blue', 'saffron-mango', 'wisteria', 'sunset-orange', 'bermuda', 'sunglow', 'java', 'mantis'];

    //object for storing random background values for tasks items
    $scope.objOfColors = {};

    // function for randomizing background color of tasks items
    $scope.randomColor = function() {
      angular.forEach($scope.tasksItems, function(value) {
        var taskId = value._id;
        var idInObj = false;
        for (var key in $scope.objOfColors) {
          if (key === taskId) {
            idInObj = true;
            break;
          }
        }
        if (idInObj === false) {
          var colInd = Math.floor((Math.random() * $scope.taskItemBgColorsArr.length) + 0);
          $scope.objOfColors[taskId] = $scope.taskItemBgColorsArr[colInd];
        }
      });
    };
    //-------------------------------------------------------

    //set initial tag for filter
    $scope.filteredTag = 'all';

    //array with all tags used in this view
    $scope.tasksTags = [];

    //function for getting all tasks tags
    $scope.getAllTasksTags = function() {
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
      $scope.getAllTasksTags();
    });

    //function for assigning tag
    $scope.assignTag = function(index) {
      $scope.filteredTag = $scope.tasksTags[index];
    };

    $scope.tagsArrTest = [];

    $scope.createTagsArrTest = function () {
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
    $scope.modWindParamsObj = {
      animation: true,
      templateUrl: '../components/tasksComponent/newTaskModalWind.html',
      controller: 'newTaskModalInstanceWindCtrl',
      resolve: {
        addTask: function () {
          return $scope.addTask;
        },
        tasksTags: function() {
          return $scope.tasksTags;
        }
      }
    };

    $scope.open = function () {
      $uibModal.open($scope.modWindParamsObj);
    };
//---------------------------------------------------------------
//---------------------------------------------------------------
    //functions and variables for error handling in case of failed responses from the server
    $scope.code = '404';
    $scope.status = 'No such item on server';
    $scope.errorVisibility = false;
    $scope.errorMessClose = function() {
      $scope.errorVisibility = false;
      $scope.code = '';
      $scope.status = '';
    };
    $scope.errorMessOpen = function(code, status) {
      $scope.code = code;
      $scope.status = status;
      $scope.errorVisibility = true;
    };
//---------------------------------------------------------------

    $scope.init = function() {
      $scope.getTasksArr();
      $scope.createTagsArrTest();
      $scope.checkActiveTag(0);
    };

    $scope.init();
  });
