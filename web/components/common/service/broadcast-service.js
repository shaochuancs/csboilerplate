/**
 * Created by cshao on 1/15/16.
 */

"use strict";

var app = require('common/baseApp');

app.service('BroadcastService', function($rootScope){
  this.broadcast = function(message) {
    $rootScope.$broadcast(message);
  };
});