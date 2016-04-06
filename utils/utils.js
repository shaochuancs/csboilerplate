/**
 * Created by cshao on 1/6/16.
 */

"use strict";

var jwt = require('jsonwebtoken');
var concat = require('concat-stream');
var debugServer = require('debug')('csboilerplate:server');

var constants = require('../config/constants');
var secret = constants['SECRET'];
var useNormalize = constants.USE_NORMALIZE;

var ENCODING_QUESTION_MARK = '__qm__';
var ENCODING_EQUAL = '__eq__';
var ENCODING_AND = '__and__';

exports.TOKEN_EXTEND_DISTANCE_TO_EXPIRE_IN_MILLISECONDS = 300000; //5 minutes
exports.TOKEN_EXPIRE_MINUTES = 10;

exports.encodeURL = function(url) {
  return url.replace(/\?/g, ENCODING_QUESTION_MARK)
            .replace(/=/g, ENCODING_EQUAL)
            .replace(/&/g, ENCODING_AND);
};
exports.decodeURL = function(encodedUrl) {
  if (!encodedUrl) {
    return null;
  }
  return encodedUrl.replace(new RegExp(ENCODING_QUESTION_MARK, 'g'), '?')
                    .replace(new RegExp(ENCODING_EQUAL, 'g'), '=')
                    .replace(new RegExp(ENCODING_AND, 'g'), '&');
};

exports.setTokenCookie = function(decoded, res) {
  var newToken = jwt.sign(decoded, secret, { expiresIn: this.TOKEN_EXPIRE_MINUTES*60 });
  res.cookie('token', newToken, { maxAge: this.TOKEN_EXPIRE_MINUTES*60*1000, httpOnly: true });
};

exports.debugDatabaseFailure = function(operation, params) {
  var log = 'Error: ' + operation + ' in database failed';
  for (var i in params) {
    var paramLog = ', ' + i + ': ' + JSON.stringify(params[i]);
    log = log + paramLog;
  }
  debugServer(log);
};

exports.getNormalizedStream = function(res, normalizeFunc) {
  if (useNormalize === 'true') {
    return concat(normalizeFunc);
  } else {
    return res;
  }
};

exports.getRequestTargetOption = function(url, req, onlyCookie) {
  function assembleHeadersObj(req, onlyCookie) {
    var headers = {};
    if (req.cookies) {
      var cookieVal = '';
      for (var key in req.cookies) {
        cookieVal = cookieVal + key + '=' + req.cookies[key] + ';';
      }
      if (cookieVal) {
        cookieVal = cookieVal.substring(0, cookieVal.length-1);
        headers['Cookie'] = cookieVal;
      }
    }
    if (!onlyCookie) {
      if (req.header('Content-Type')) {
        headers['Content-Type'] = req.header('Content-Type');
      }
    }

    return headers;
  }

  var paramStr = '?';
  for(var q in req.query) {
    paramStr += (q + '=' + req.query[q] + '&');
  }
  if(paramStr === '?') {
    paramStr = '';
  }

  var targetOption = {
    url: url + paramStr,
    headers: assembleHeadersObj(req, onlyCookie)
  };
  if (req.entity) {
    targetOption.body = req.entity;
  } else if (req.body) {
    targetOption.json = req.body;
  }
  return targetOption;
};