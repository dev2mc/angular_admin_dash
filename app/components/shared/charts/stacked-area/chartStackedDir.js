'use strict';
angular.module('angularDashboardApp')
  .directive('chartStacked', function($window){
    return {
      restrict: 'E',
      scope:{data:'='},
      link: function(scope, elem){
        var w = angular.element($window);
        function drawChart(){
            return c3.generate({
              bindto: elem[0],
              tooltip: {
                  show: false
               },
              grid: {
                x: {
                  show: true
                },
                y: {
                  show: true
                }
              },
              point: {
                show: false
              },
              color: {
                pattern: ['#73cba7', '#ffd876']
              },
              legend: {
                position: 'inset'
              },
              axis: {
                 x: {
                  type: 'category',
                  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun'],
                  padding: {
                    left: 0,
                    right: 0,
                  }
                 }
              },
              padding: {
                right: 25,
              },
              data: scope.data,
            });
        }
        setTimeout(function () {
          drawChart(scope.data).resize();
        }, 0);
        setTimeout(function () {
          drawChart(scope.data).resize();
        }, 1000);
        w.resize(function() {
          drawChart(scope.data).resize();
        });
        scope.$watch('data',function(){
          drawChart();
        }, true);
      }
    };
  });
