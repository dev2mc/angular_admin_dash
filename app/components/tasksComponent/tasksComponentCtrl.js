'use strict';
angular.module('angularDashboardApp')
  .controller('tasksComponentCtrl', function($scope) {
    $scope.tasksItems = [
      {
        id: 'q001',
        name: 'Item 1',
        tag: 'work',
        description: 'Hire Baraa Bilal shopping as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      },
      {
        id: 'q002',
        name: 'Item 2',
        tag: 'entertainment',
        description: 'Hire Baraa shopping Bilal work as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: true
      },
      {
        id: 'q003',
        name: 'Item 3',
        tag: 'work',
        description: 'Hire Baraa Bilal entertainment as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      },
      {
        id: 'q004',
        name: 'Item 4',
        tag: 'shopping',
        description: 'Hire Baraa work Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      },
      {
        id: 'q005',
        name: 'Item 5',
        tag: 'work',
        description: 'Hire Baraa Bilal as CEO for home Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: true
      },
      {
        id: 'q006',
        name: 'Item 6',
        tag: 'home',
        description: 'Hire Baraa Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      },
      {
        id: 'q007',
        name: 'Item 7',
        tag: 'shopping',
        description: 'Hire Baraa work Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      },
      {
        id: 'q008',
        name: 'Item 8',
        tag: 'work',
        description: 'Hire Baraa Bilal as CEO for home Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: true
      },
      {
        id: 'q009',
        name: 'Item 9',
        tag: 'home',
        description: 'Hire Baraa Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      }
    ];

    //array of color for tasks__item background
    var taskItemBgColorsArr = ['ship-cove', 'cornflower-blue', 'saffron-mango', 'wisteria', 'sunset-orange', 'bermuda', 'sunglow', 'java', 'mantis'];

    $scope.arrayOfColors = [];

    //function for randomizing background color of tasks items
    $scope.randomColor = function() {
      for (var i = 0; i < $scope.tasksItems.length; i++) {
        var colInd = Math.floor((Math.random() * taskItemBgColorsArr.length) + 0);
        $scope.arrayOfColors.push(taskItemBgColorsArr[colInd]);
      }
    };

    //set initial tag for filter
    $scope.filteredTag = 'all';

    //array with all tags used in this view
    $scope.tasksTags = ['all', 'work', 'home', 'shopping', 'entertainment'];

    //function for assigning tag
    $scope.assignTag = function(index) {
      $scope.filteredTag = $scope.tasksTags[index];
    };

    //check or uncheck favorite icon for tasd__item
    $scope.changeFavorite = function(index) {
      $scope.tasksItems[index].favorite = !$scope.tasksItems[index].favorite;
    };

    //initial array of task__item's id to delete
    var taskItemsToDel = [];

    //function for adding items for deletion to array taskItemsToDel
    $scope.addTasksToDel = function(index) {
      if (taskItemsToDel.indexOf(index) === -1) {
        taskItemsToDel.push(index);
      } else {
        var itemInd = taskItemsToDel.indexOf(index);
        taskItemsToDel.splice(itemInd, 1);
      }
    };

    // function for removing tasks from tasksItems array
    $scope.removeTasks = function() {
      //check if taskItemsToDel array is defined and is not empty
      if (typeof taskItemsToDel !== 'undefined' && taskItemsToDel.length > 0) {
        //elements of tasksItems array will be deleted in that function
        angular.forEach(taskItemsToDel, function(id) {
          angular.forEach($scope.tasksItems, function(item, index, array) {
            if (item.id === id) {
              array.splice(index, 1);
            }
          });
        });
        //empty taskItemsToDel array for next deletions
        taskItemsToDel = [];
      }
    };

    $scope.delTasksItemsVisible = false;

    $scope.toggleDelTasksVisible = function() {
      $scope.delTasksItemsVisible = !$scope.delTasksItemsVisible;
    };

    var init = function() {
      $scope.randomColor();
    };

    init();
  });