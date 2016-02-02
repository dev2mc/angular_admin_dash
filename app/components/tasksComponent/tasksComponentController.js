'use strict';
angular.module('angularDashboardApp')
  .controller('tasksComponentCtrl', function($scope) {
    $scope.tasksItems = [
      {
        name: 'Hire Baraa',
        tag: 'work',
        description: 'Hire Baraa Bilal shopping as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      },
      {
        name: 'Hire Baraa',
        tag: 'entertainment',
        description: 'Hire Baraa shopping Bilal work as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: true
      },
      {
        name: 'Hire Baraa',
        tag: 'work',
        description: 'Hire Baraa Bilal entertainment as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      },
      {
        name: 'Hire Baraa',
        tag: 'shopping',
        description: 'Hire Baraa work Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      },
      {
        name: 'Hire Baraa',
        tag: 'work',
        description: 'Hire Baraa Bilal as CEO for home Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: true
      },
      {
        name: 'Hire Baraa',
        tag: 'home',
        description: 'Hire Baraa Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      },
      {
        name: 'Hire Baraa',
        tag: 'shopping',
        description: 'Hire Baraa work Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      },
      {
        name: 'Hire Baraa',
        tag: 'work',
        description: 'Hire Baraa Bilal as CEO for home Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: true
      },
      {
        name: 'Hire Baraa',
        tag: 'home',
        description: 'Hire Baraa Bilal as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      }
    ];

    var taskItemBgColorsArr = ['ship-cove', 'cornflower-blue', 'saffron-mango', 'wisteria', 'sunset-orange', 'bermuda', 'sunglow', 'java', 'mantis'];

    $scope.arrayOfColors = [];

    //function for randomizing background color of tasks items
    $scope.randomColor = function() {
      for (var i = 0; i < $scope.tasksItems.length; i++) {
        var colInd = Math.floor((Math.random() * taskItemBgColorsArr.length) + 0);
        $scope.arrayOfColors.push(taskItemBgColorsArr[colInd]);
      }
    };

    $scope.filteredTag = 'all';

    $scope.tasksTags = ['all', 'work', 'home', 'shopping', 'entertainment'];

    $scope.assignTag = function(index) {
      $scope.filteredTag = $scope.tasksTags[index];
    };

    $scope.changeFavorite = function(index) {
      $scope.tasksItems[index].favorite = !$scope.tasksItems[index].favorite;
    };

    var init = function() {
      $scope.randomColor();
    };

    init();
  });