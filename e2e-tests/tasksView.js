'use strict';

var TasksPage = require('./page-objects/TasksPage.js');
var AddTaskModal = require('./page-objects/AddTaskModal.js');

describe('tasksComponent view: ', function() {
  var tasksPage = new TasksPage();
  var addTaskModal = new AddTaskModal();

  browser.get('index.html');

  it('should filter tasks items on click on certain tag and after click on all tag show all items', function() {
    var allTagInd = 0;
    var tagInd = 1;
    var tagText = tasksPage.tags.get(tagInd).getText();
    var tasksItemsInitCount = tasksPage.tasksItems.count();

    tasksPage.tags.get(tagInd).click();

    tasksPage.tasksItemsTags.getText().then(function(text) {
      text.forEach(function(el) {
        tagText.then(function(tagTxt) {
          expect(el.toLowerCase()).toEqual(tagTxt.toLowerCase());
        });
      });
    });

    tasksPage.tags.get(allTagInd).click();

    tasksPage.tasksItems.count().then(function(actualCount) {
      tasksItemsInitCount.then(function(initCount) {
        expect(actualCount).toEqual(initCount);
      });
    });
  });

  it('should invoke modal window and create new task', function() {
    var newItemName = 'newItemTest1';
    var newItemTag = 'newItemTestTag1';
    var newItemDesc = 'new item test 1 description text';
    var tasksItemsInitCount = tasksPage.tasksItems.count();

    tasksPage.invokeAddItem.click();

    addTaskModal.addTaskItem(newItemName, newItemTag, newItemDesc);

    tasksPage.tasksItems.count().then(function(actualCount) {
      tasksItemsInitCount.then(function(initCount) {
        expect(actualCount).toBeGreaterThan(initCount);
      });
    });
  });

  it('should create new item with tag chosen from tag list', function() {
    var chosenTagInd = 0;
    var newItemName = 'newItemTest2';
    var newItemDesc = 'new item test 2 description text';
    var tasksItemsInitCount = tasksPage.tasksItems.count();

    tasksPage.invokeAddItem.click();

    var chosenTag = addTaskModal.tagToChoose.get(chosenTagInd);
    var chosenTagText = chosenTag.getText();

    addTaskModal.nameInput.sendKeys(newItemName);

    chosenTag.click();

    addTaskModal.descInput.sendKeys(newItemDesc);

    addTaskModal.addTaskBtn.click();

    tasksPage.tasksItems.count().then(function(actualCount) {
      tasksItemsInitCount.then(function(initCount) {
        expect(actualCount).toBeGreaterThan(initCount);
      });
    });

    var lastTask = tasksPage.tasksItems.last();
    var lastTaskTagText = lastTask.element(by.css('.tasks__item__tag')).getText();

    chosenTagText.then(function(a) {
      lastTaskTagText.then(function(b) {
        expect(a.toLowerCase()).toEqual(b.toLowerCase());
      });
    });
  });

  it('should remove 2 previsouly added items', function() {
    var tasksItemsInitCount = tasksPage.tasksItems.count();

    var delLastItem = function() {
      tasksPage.invokeDelItem.click();
      var lastTask = tasksPage.tasksItems.last();
      lastTask.element(by.css('.tasks__item__label')).click();
      tasksPage.delTasksBtn.click();
    };

    delLastItem();
    delLastItem();

    tasksPage.tasksItems.count().then(function(actualCount) {
      tasksItemsInitCount.then(function(initCount) {
        expect(actualCount).toBeLessThan(initCount);
      });
    });
  });

  it('should dismmiss modal window on "cancel" button click', function() {
    tasksPage.invokeAddItem.click();
    addTaskModal.cancelAddTaskBtn.click();
  });

  it('should on click change favorite icon of first item to opposite', function() {
    var favFirstItem = tasksPage.getFavBtn(0);
    favFirstItem.click();
    favFirstItem.click();
  });
});