'use strict';
angular.module('angularDashboardApp')
  .filter('tasksComponentItemsFilter', function() {
    return function(input, filteredTag) {
      var newTasksArr = [];
      if (filteredTag === 'all') {
        return input;
      } else if (filteredTag === undefined) {
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