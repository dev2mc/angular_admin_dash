'use strict';
angular.module('angularDashboardApp')
  .directive('calendar', function() {
    function _removeTime(date) {
      return date.day(0).hour(0).minute(0).second(0).millisecond(0);
    }

    function _buildWeek(date, month) {
      var days = [];
      for (var i = 0; i < 7; i++) {
        days.push({
          name: date.format('dd').substring(0, 1),
          number: date.date(),
          isCurrentMonth: date.month() === month.month(),
          isToday: date.isSame(new Date(), 'day'),
          date: date
        });
        date = date.clone();
        date.add(1, 'd');
      }
      return days;
    }

    function _buildMonth(scope, start, month) {
      scope.weeks = [];
      var done = false, date = start.clone(), monthIndex = date.month(), count = 0;
      while (!done) {
        scope.weeks.push({ days: _buildWeek(date.clone(), month) });
        date.add(1, 'w');
        done = count++ > 2 && monthIndex !== date.month();
        monthIndex = date.month();
      }
    }

    return {
      restrict: 'E',
      templateUrl: '../components/shared/calendar/calendarTemplate.html',
      scope: {
        selected: '='
      },
      link: function(scope) {
        scope.selected = _removeTime(scope.selected || moment());
        scope.selectedDate = scope.selected.clone().format('MMMM Do YYYY');
        scope.month = scope.selected.clone();

        var start = scope.selected.clone();
        start.date(1);
        _removeTime(start.day(0));

        _buildMonth(scope, start, scope.month);

        scope.select = function(day) {
          scope.selected = day.date;
          scope.selectedDate = day.date.format('MMMM Do YYYY');
        };

        scope.next = function() {
          var next = scope.month.clone();
          _removeTime(next.month(next.month()+1).date(1).day(0));
          scope.month.month(scope.month.month()+1);
          _buildMonth(scope, next, scope.month);
        };

        scope.previous = function() {
          var previous = scope.month.clone();
          _removeTime(previous.month(previous.month()-1).date(1).day(0));
          scope.month.month(scope.month.month()-1);
          _buildMonth(scope, previous, scope.month);
        };
      }
    };
  });
