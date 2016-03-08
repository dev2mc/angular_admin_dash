'use strict';
angular.module('angularDashboardApp')
    .controller('testChartCtrl',function($scope){
        $scope.myData = {
            columns: [
                ['Sales', 100, 200, 320, 789, 500, 250],
                ['Users', 50, 325, 125, 450, 233, 350]
            ],
            types: {
              Sales: 'area-spline',
              Users: 'area-spline'
            }
        };
    })
    .directive('testChartDir', function($window){
        return {
            restrict: 'E',
            scope:{data:'='},
            link: function(scope, elem){
                var w = angular.element($window);
                 scope.lineChart = false;

                 function drawChart(data){
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
                          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                          padding: {
                            left: 0,
                            right: 0,
                          }
                         }
                      },
                      data: scope.data,
                    });
                 }

                setTimeout(function () {
                  drawChart(scope.data).resize();
                }, 0);

                w.resize(function() {
                  drawChart(scope.data).resize();
                  scope.$apply();
                });

                scope.$watch('data',function(data){
                  if(scope.lineChart) {
                    scope.lineChart.load(data);
                  } else {
                    scope.lineChart = drawChart(data);
                  }
                }, true);
            }
        };
    });
