'use strict';

describe('tasksComponent: controller: newTaskModalInstanceWindCtrl - ', function() {
  var $scope, $uibModalInstance, addTask, tasksTags, newTaskModalInstanceWindCtrl, dummyNewTask;

  beforeEach(function() {
    var mock$uibModalInstance = {};
    module('angularDashboardApp', function($provide) {
      $provide.value('$uibModalInstance', mock$uibModalInstance);
    });

    mock$uibModalInstance.close = function() {
    };

    mock$uibModalInstance.dismiss = function() {
    };

    addTask = function(task) {
      console.log(task);
    };

    tasksTags = ['all', 'shopping', 'home', 'entertainment'];

    dummyNewTask = {
      favorite: false,
      tag: undefined,
      name: undefined,
      description: undefined
    };
  });

  beforeEach(inject(function($controller, $rootScope, _$uibModalInstance_) {
    $scope = $rootScope.$new();
    $uibModalInstance = _$uibModalInstance_;
    newTaskModalInstanceWindCtrl = $controller('newTaskModalInstanceWindCtrl', {
      $scope: $scope,
      $uibModalInstance: $uibModalInstance,
      addTask: addTask,
      tasksTags: tasksTags
    });
    $scope.$apply();
  }));

  it('$scope.init() shoud be defined', function() {
    spyOn($scope, 'init');
  });

  it('$scope.addTask function should be defined and equal to addTask function inject as a dependency', function() {
    expect($scope.addTask).toBeDefined();
  });

  it('$scope.newTask object should be present on the controller, be defined and equal to dummyNewTask', function() {
    expect($scope.newTask).toBeDefined();
    expect($scope.newTask).toEqual(dummyNewTask);
  });

  it('$scope.delAllTag() function should have been call on controller initialization', function() {
    spyOn($scope, 'delAllTag');
    $scope.init();
    expect($scope.delAllTag).toHaveBeenCalled();
  });

  it('$scope.delAllTag() function should strip first "all" tag from $scope.tagsToChoose', function() {
    $scope.tagsToChoose = tasksTags;
    $scope.delAllTag();
    expect($scope.tagsToChoose).not.toContain('all');
  });

  it('$scope.ok() function should invoke $uibModalInstance.close() method with $scope.addTask as a parameter', function() {
    spyOn($uibModalInstance, 'close');
    $scope.ok();
    expect($uibModalInstance.close).toHaveBeenCalledWith($scope.addTask());
  });

  it('$uibModalInstance.close() function (when invoked by $scope.ok()) should invoke $scope.addTask() function with parameter $scope.newTask', function() {
    spyOn($scope, 'addTask');
    $scope.ok();
    expect($scope.addTask).toHaveBeenCalledWith($scope.newTask);
  });

  it('$scope.cancel() function should invoke $uibModalInstance.dismiss() function with parameter "cancel"', function() {
    spyOn($uibModalInstance, 'dismiss');
    $scope.cancel();
    expect($uibModalInstance.dismiss).toHaveBeenCalledWith('cancel');
  });
});