'use strict';
angular.module('angularDashboardApp')
  .factory('tasksRemoteDataService', function($http) {
    var collectionsUrl = 'https://api.mongolab.com/api/1/databases/angjsbyexmpl/collections';
    var apiKeyStr = 'wYOXfeNqx8m2P7fxATUeF4QSU7qoC9RT';
    var collection = '/tasks';

    return {
      getTasks: function () {
        return $http.get(collectionsUrl + collection, {
          params: {apiKey: apiKeyStr}
        });
      },
      getSingleTask: function (id) {
        return $http.get(collectionsUrl + collection + '/' + id, {
          params: {apiKey: apiKeyStr}
        });
      },
      addTask: function (task) {
        return $http.post(collectionsUrl + collection, task, {
          params: {apiKey: apiKeyStr}
        });
      },
      removeTask: function (id) {
        return $http.delete(collectionsUrl + collection + '/' + id, {
          params: {apiKey: apiKeyStr}
        });
      },
      updateTask: function (data, id) {
        return $http.put(collectionsUrl + collection + '/' + id, data, {
          params: {apiKey: apiKeyStr}
        });
      }
    };
  });