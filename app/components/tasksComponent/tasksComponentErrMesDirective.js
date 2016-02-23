'use strict';
angular.module('angularDashboardApp')
  .directive('errorTask', function() {
    return {
      restrict: 'E',
      scope: {
        code: '=',
        status: '=',
        close: '&'
      },
      template: '<div class="tasks__error"><h3 class="tasks__error__heading">Error has occured</h3><p class="tasks__error__apology">Sorry, there was an error:</p><p class="tasks__error__stats"><span class="tasks__error__code">{{code}}</span> <span class="tasks__error__status">{{status}}</span></p><p class="tasks__error__advise">Please, try again.</p><i class="fa fa-times-circle tasks__error__close" ng-click="close()"></i></div>'
    };
  });
