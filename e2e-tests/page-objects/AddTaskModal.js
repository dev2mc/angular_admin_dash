'use strict';
var AddTaskModal = function() {
  this.inputs = element.all(by.css('.tasks__modal-input'));
  this.nameInput = this.inputs.get(0);
  this.tagInput = this.inputs.get(1);
  this.descInput = this.inputs.get(2);
  this.tagToChoose = element.all(by.css('.tasks__modal-tag'));
  this.chooseTag = function(ind) {
    var tag = this.tagToChoose.get(ind);
    return tag;
  };
  this.addTaskBtn = element(by.css('.tasks__modal-button.tasks__modal-button_bg_add'));
  this.cancelAddTaskBtn = element(by.css('.tasks__modal-button.tasks__modal-button_bg_cancel'));
  this.addTaskItem = function (name, tag, description) {
    this.nameInput.sendKeys(name);
    this.tagInput.sendKeys(tag);
    this.descInput.sendKeys(description);
    this.addTaskBtn.click();
  };
};

module.exports = AddTaskModal;