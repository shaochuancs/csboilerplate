/**
 * Created by cshao on 1/6/16.
 */

"use strict";

var jwt = require('jsonwebtoken');
var concat = require('concat-stream');
var debugServer = require('debug')('csboilerplate:server');

var constants = require('../config/constants');
var secret = constants['SECRET'];

var ENCODING_QUESTION_MARK = '__qm__';
var ENCODING_EQUAL = '__eq__';
var ENCODING_AND = '__and__';

exports.TOKEN_EXTEND_DISTANCE_TO_EXPIRE_IN_MILLISECONDS = 600000; //10 minutes
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
  res.cookie('token', newToken, { maxAge: this.TOKEN_EXPIRE_MINUTES*60*1000 });
};

exports.debugDatabaseFailure = function(operation, params) {
  var log = 'Error: ' + operation + ' in database failed';
  for (var i in params) {
    var paramLog = ', ' + i + ': ' + JSON.stringify(params[i]);
    log = log + paramLog;
  }
  debugServer(log);
};