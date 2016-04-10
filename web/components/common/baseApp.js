/**
 * Created by cshao on 2/9/15.
 */

"use strict";

var app = angular.module('csboilerplate', []);

app.config(['$httpProvider', '$provide', function($httpProvider, $provide) {
  $provide.factory('myHttpInterceptor', ['$q',
    function($q) {
      return {
        // optional method
        'request': function(config) {
          var token = Cookies.get('XSRF-TOKEN');
          if (token) {
            config.headers['XSRF-TOKEN'] = token;
          }
          return config;
        },

        // optional method
        'requestError': function(rejection) {
          return $q.reject(rejection);
        },

        'response': function(response) {
          // do something on success
          return response;
        },

        // optional method
        'responseError': function(response) {
          return response;
        }
      };
    }
  ]);
  $httpProvider.interceptors.push('myHttpInterceptor');
}]);

module.exports = app;