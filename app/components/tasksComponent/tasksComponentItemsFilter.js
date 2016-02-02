'use strict';
angular.module('angularDashboardApp')
  .filter('tasksItemFilter', function() {
    return function(input, filteredTag) {
      var newTasksArr = [];
      if (filteredTag === 'all') {
        return input;
      } else {
        for (var i = 0; i < input.length; i++) {
          if (input[i].tag === filteredTag) {
            newTasksArr.push(input[i]);
          }
        }
        return newTasksArr;
      }
    };
  });