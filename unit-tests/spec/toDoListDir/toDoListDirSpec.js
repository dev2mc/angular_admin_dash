'use strict';
describe('toDoList directive: ', function () {
  var element, scope, ctrlScope, controller, dummyToDoData;

  beforeEach(function () {
    dummyToDoData = [
      {
        _id: '3937483',
        text: 'Do your ToDo List today at 4AM GMT',
        completed: false
      },
      {
        _id: '0325566',
        text: 'Do your ToDo List today at 6AM GMT',
        completed: false
      },
      {
        _id: '0457874',
        text: 'Do your ToDo List today at 2AM GMT',
        completed: true
      },
      {
        _id: '4986104',
        text: 'Do your ToDo List today at 3AM GMT',
        completed: true
      }
    ];
  });

  beforeEach(module('angularDashboardApp'));

  beforeEach(module('appTemplates'));

  beforeEach(inject(function($rootScope, $compile) {

    scope = $rootScope.$new();

    element = '<to-do-list data="todoListData" change-completed="changeCompleted(id)" del-item="delToDoItem(id)" add-item="addToDoItem(item)"></to-do-list>';

    scope.todoListData = dummyToDoData;
    scope.changeCompleted = jasmine.createSpy('changeCompleted');
    scope.delToDoItem = jasmine.createSpy('delToDoItem');
    scope.addToDoItem = jasmine.createSpy('addToDoItem');

    element = $compile(element)(scope);

    scope.$apply();

    controller = element.controller('toDoList');

    ctrlScope = element.isolateScope() || element.scope();
  }));

  it('should apply template to directive', function () {
    expect(element.html()).not.toEqual('');
  });

  it('should have an isolated scope with listed properties', function () {
    var isolated = element.isolateScope();
    expect(isolated.data).toEqual(dummyToDoData);
    expect(isolated.changeCompleted).toBeDefined();
    expect(isolated.delItem).toBeDefined();
    expect(isolated.addItem).toBeDefined();
  });

  describe('directive controller: ', function () {
    var testNewItem;

    beforeEach(function () {
      testNewItem = {
        text: '',
        completed: false
      };
    });

    it('should have addToDoItemVisibility variable with falsy value', function () {
      expect(ctrlScope.addToDoItemVisibility).toBeFalsy();
    });

    it('should have dummyNewToDoItem with template object for creating new todo items', function () {
      expect(ctrlScope.dummyNewToDoItem).toEqual(testNewItem);
    });

    it('should have a defined newTaskItem', function () {
      expect(ctrlScope.newToDoItem).toEqual(testNewItem);
    });

    it('should have function changeAddToDoVisibility that changes the value of addToDoItemVisibility to opposite boolean value', function () {
      ctrlScope.addToDoItemVisibility = false;
      ctrlScope.changeAddToDoVisibility();
      expect(ctrlScope.addToDoItemVisibility).toBeTruthy();
    });

    it('should have clearNewToDoForm function that resets the value of newToDoItem', function () {
      ctrlScope.newToDoItem = {
        text: 'test text',
        complete: true
      };

      ctrlScope.clearNewToDoForm();
      expect(ctrlScope.newToDoItem).toEqual(testNewItem);
    });
  });

  describe('compiled elements: ', function () {
    it('should have amount of todo items equal to amount of objects in toDoData array', function () {
      var amountToDoElems = element[0].getElementsByClassName('dashboard__todo__item').length;

      var amountToDoObjs = dummyToDoData.length;

      expect(amountToDoElems).toEqual(amountToDoObjs);
    });

    describe('text of todo items in html: ', function () {
      var htmlTodoElems, htmlFirstItemText, dotoItemsFirstText, htmlLastItemText, dotoItemsLastText;

      beforeEach(function () {
        htmlTodoElems = element[0].getElementsByClassName('dashboard__todo__item');

        htmlFirstItemText = htmlTodoElems[0].querySelector('.dashboard__todo__info').querySelector('span').textContent;

        dotoItemsFirstText = dummyToDoData[0].text;

        htmlLastItemText = htmlTodoElems[htmlTodoElems.length - 1].querySelector('.dashboard__todo__info').querySelector('span').textContent;

        dotoItemsLastText = dummyToDoData[dummyToDoData.length - 1].text;
      });

      it('first elem text in data array should be equal to first elem text of item in html', function () {
        expect(htmlFirstItemText).toEqual(dotoItemsFirstText);
      });

      it('last elem text in data array should be equal to last elem text of item in html', function () {
        expect(htmlLastItemText).toEqual(dotoItemsLastText);
      });
    });

    describe('add todo form:', function () {
      var form;

      beforeEach(function () {
        form = element.find('form');
      });

      it('form element should be defined', function () {
        expect(form).toBeDefined();
      });

      it('label element should be defined', function () {
        var labelElem = form.find('label');
        expect(labelElem).toBeDefined();
      });

      it('input element should be defined', function () {
        var inputElem = form.find('label');
        expect(inputElem).toBeDefined();
      });

      it('2 button should be defined', function () {
        var buttons = form.find('button');
        expect(buttons).toBeDefined();
        expect(buttons.length).toEqual(2);
      });
    });
  });
});
