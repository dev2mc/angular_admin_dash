'use strict';

describe('taskComponent: filter: tasksComponentItemsFilter - ', function() {
  var tasksComponentItemsFilter, dummyTasksItems, $filter;

  beforeEach(module('angularDashboardApp'));

  beforeEach(inject(function(_$filter_) {
    $filter = _$filter_;
  }));

  beforeEach(function() {
    tasksComponentItemsFilter = $filter('tasksComponentItemsFilter');
  });

  beforeEach(function() {
    dummyTasksItems = [
      {
        id: 'q001',
        name: 'Item 1',
        tag: 'work',
        description: 'Hire Baraa Bilal shopping as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      },
      {
        id: 'q002',
        name: 'Item 2',
        tag: 'entertainment',
        description: 'Hire Baraa shopping Bilal work as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: true
      },
      {
        id: 'q003',
        name: 'Item 3',
        tag: 'work',
        description: 'Hire Baraa Bilal entertainment as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      }
    ];
  });

  it('should return untouched unput if filtered tag is undefined', function() {
    expect(tasksComponentItemsFilter(dummyTasksItems)).toEqual(dummyTasksItems);
  });

  it('should return untouched input if filtered tag is "all"', function() {
    expect(tasksComponentItemsFilter(dummyTasksItems, 'all')).toEqual(dummyTasksItems);
  });

  it('should return only items with tags "work"', function() {
    var filteredDummyTasksItems =  [
      {
        id: 'q001',
        name: 'Item 1',
        tag: 'work',
        description: 'Hire Baraa Bilal shopping as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      },
      {
        id: 'q003',
        name: 'Item 3',
        tag: 'work',
        description: 'Hire Baraa Bilal entertainment as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: false
      }
    ];
    expect(tasksComponentItemsFilter(dummyTasksItems, 'work')).toEqual(filteredDummyTasksItems);
  });

  it('should return only item with tag "entertainment"', function() {
    var filteredDummyTasksItems = [
      {
        id: 'q002',
        name: 'Item 2',
        tag: 'entertainment',
        description: 'Hire Baraa shopping Bilal work as CEO for Apple tomorrow at 9PM in the meeting at Lazi’ Cafe in Amman Jordan',
        favorite: true
      }
    ];
    expect(tasksComponentItemsFilter(dummyTasksItems, 'entertainment')).toEqual(filteredDummyTasksItems);
  });

});