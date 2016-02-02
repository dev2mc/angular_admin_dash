'use strict';

describe('Controller: tasksComponentCtrl', function() {
  // load the controller module
  beforeEach(module('angularDashboardApp'));

  var tasksComponentCtrl, scope;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    tasksComponentCtrl = $controller('tasksComponentCtrl', {
      $scope: scope
    });
    scope.$digest();
  }));

  it('tasksItems array should be defined', function() {
    expect(scope.tasksItems).toBeDefined();
  });

  it('tasksTags array should be defined', function() {
    expect(scope.tasksTags).toBeDefined();
  });

  it('filteredTag scope variable should have initial value of "all"', function() {
    expect(scope.filteredTag).toEqual('all');
  });

  // it('init function for tasksComponentCtrl should be defined', function() {
  //   expect(init()).toBeDefined();
  // });

  // it('init function for tasksComponentCtrl should be called on initialization of project', function() {
  //   expect(init()).toHaveBeenCalled();
  // });

  xit('randomColor function should have been called on initialization of project', function() {
    // spyOn(scope, 'randomColor');
    spyOn(scope, 'randomColor').and.callThrough();
    expect(scope.randomColor).toHaveBeenCalled();
  });
});