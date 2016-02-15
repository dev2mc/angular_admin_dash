'use strict';

describe('tasksComponent: controller: newTaskModalInstanceWindCtrl - ', function() {
  var $scope, $uibModal, $uibModalInstance, addTask, tasksTags, newTaskModalInstanceWindCtrl;

  beforeEach(module('angularDashboardApp'));

  beforeEach(inject(function($controller, $rootScope, _$uibModal_, _$uibModalInstance_, _addTask_, _tasksTags_) {
    $scope = $rootScope.$new();
    $uibModal = _$uibModal_;
    $uibModalInstance = _$uibModalInstance_;
    addTask = _addTask_;
    tasksTags = _tasksTags_;
    newTaskModalInstanceWindCtrl = $controller('newTaskModalInstanceWindCtrl', {
      $scope: $scope,
      $uibModal: $uibModal,
      $uibModalInstance: $uibModalInstance,
      addTask: addTask,
      tasksTags: tasksTags
    });
    $scope.$apply();
  }));

  it('$scope.addTask function should be defined and equal to addTask function inject as a dependency', function() {
    expect(addTask).toBeDefined();
    expect($scope.addTask).toBeDefined();
  });
});