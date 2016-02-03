/**
 * Created by cshao on 2/9/15.
 */

"use strict";

var app = require('common/baseApp');

app.service('UtilsService', function(){
  this.getURLParams = function() {
    var params = {};
    var url = location.search;
    var lastQuestionMarkLoc = url.lastIndexOf('?');
    if (lastQuestionMarkLoc >= 0) {
      var paramsArr = url.slice(lastQuestionMarkLoc + 1).split('&');

      for (var i in paramsArr) {
        var item = paramsArr[i];
        var paramKeyVal = item.split('=');
        params[paramKeyVal[0]] = paramKeyVal[1];
      }
    }
    return params;
  };
  this.isCurrentURL = function(url) {
    return location.pathname === url;
  };

  this.decodeURL = function(encodedUrl) {
    var ENCODING_QUESTION_MARK = '__qm__';
    var ENCODING_EQUAL = '__eq__';
    var ENCODING_AND = '__and__';

    if (!encodedUrl) {
      return null;
    }
    return encodedUrl.replace(new RegExp(ENCODING_QUESTION_MARK, 'g'), '?')
      .replace(new RegExp(ENCODING_EQUAL, 'g'), '=')
      .replace(new RegExp(ENCODING_AND, 'g'), '&');
  };
});