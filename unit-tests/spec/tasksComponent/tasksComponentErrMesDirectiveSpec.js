'use strict';
describe('tasksComponent: directive: errorTask - ', function() {
  var element, scope;

  beforeEach(module('angularDashboardApp'));

  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();

    element = '<error-task code="code" status="status" close="errorMessClose()"></error-task>';

    scope.code = 404;
    scope.status = 'item was not found';
    scope.errorMessClose = function(){};

    element = $compile(element)(scope);

    scope.$apply();
  }));

  it('should have an isolated scope with listed properties', function() {
    var isolated = element.isolateScope();
    expect(isolated.code).toEqual(404);
    expect(isolated.status).toEqual('item was not found');
    expect(isolated.close).toBeDefined();
  });

  it('should have elements that contain values listed in isolated scope of the directive', function() {
    expect(element[0].querySelector('.tasks__error__code').innerHTML).toEqual('404');
    expect(element[0].querySelector('.tasks__error__status').innerHTML).toEqual('item was not found');
    expect(angular.element(element[0].querySelector('.tasks__error__close')).attr('ng-click')).toBe('close()');
  });

  it('click on tasks__error__close element should invoke scope.errorMessClose() function', function() {
    spyOn(scope, 'errorMessClose');
    angular.element(element[0].querySelector('.tasks__error__close')).triggerHandler('click');
    expect(scope.errorMessClose).toHaveBeenCalled();
  });
});
