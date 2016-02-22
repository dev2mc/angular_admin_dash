'use strict';
var TasksPage = function() {
  this.tags = element.all(by.css('.tasks__tags__item'));

  this.invokeAddItem = element.all(by.css('.tasks__option')).get(0);

  this.invokeDelItem = element.all(by.css('.tasks__option')).get(1);

  this.tasksItems = element.all(by.css('.tasks__item'));

  this.tasksItemsTags = this.tasksItems.all(by.css('.tasks__item__tag'));

  this.getFavBtn = function(ind) {
    var taskItem = this.tasksItems.get(ind);
    var fav = taskItem.element(by.css('.tasks__item__icon-favorite'));
    return fav;
  };

  this.delTasksBtn = element(by.css('.tasks__deletion-panel__button.tasks__deletion-panel__button_bg_delete'));

  this.cancelDelTasksBtn = element(by.css('.tasks__deletion-panel__button.tasks__deletion-panel__button_bg_cancel'));

  this.getItemDelCheckbox = function(ind) {
    var taskItem = this.tasksItems.get(ind);
    var check = taskItem.element(by.css('.tasks__item__label'));
    return check;
  };
};

module.exports = TasksPage;