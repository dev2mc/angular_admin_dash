'use strict';
angular.module('angularDashboardApp')
  .controller('newTaskModalInstanceWindCtrl', function ($scope, $uibModalInstance, addTask, tasksTags) {

    $scope.addTask = addTask;

    $scope.tagsToChoose = angular.copy(tasksTags);

    $scope.delAllTag = function() {
      angular.forEach($scope.tagsToChoose, function(v, i, a){
        if (v === 'all') {
          a.splice(i, 1);
        }
      });
    };

    $scope.newTask = {
      favorite: false,
      tag: undefined,
      name: undefined,
      description: undefined
    };

    $scope.ok = function () {
      $uibModalInstance.close($scope.addTask($scope.newTask));
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.init = function() {
      $scope.delAllTag();
    };

    $scope.init();
  });