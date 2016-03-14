'use strict';
angular.module('angularDashboardApp')
  .factory('toDoListRemote', function($http) {
    var collectionsUrl = 'https://api.mlab.com/api/1/databases/angjsbyexmpl/collections';
    var apiKeyStr = 'wYOXfeNqx8m2P7fxATUeF4QSU7qoC9RT';
    var collection = '/todo';

    return {
      getAllToDo: function() {
        return $http.get(collectionsUrl + collection, {
          params: {apiKey: apiKeyStr}
        }).then(function(response) {
          var data = response.data;
          return data;
        });
      },
      addToDo: function(todo) {
        return $http.post(collectionsUrl + collection, todo, {
          params: {apiKey: apiKeyStr}
        }).then(function(response) {
          return response.data;
        });
      },
      removeToDo: function(id) {
        return $http.delete(collectionsUrl + collection + '/' + id, {
          params: {apiKey: apiKeyStr}
        }).then(function(response) {
          return response.data;
        });
      },
      updateToDo: function(todo, id) {
        return $http.put(collectionsUrl + collection + '/' + id, todo, {
          params: {apiKey: apiKeyStr}
        }).then(function(response) {
          return response.data;
        });
      }
    };
  });
