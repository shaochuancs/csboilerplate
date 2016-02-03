/**
 * Created by cshao on 1/6/16.
 */

"use strict";

var debugServer = require('debug')('csboilerplate:server');
var util = require('util');
var utils = require('../utils/utils');

exports.notFoundHandler = function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
};

var handleError = function(isDev, err, req, res) {
  debugServer('------------Error!------------');
  debugServer(util.inspect(err));
  var errorObj = {};
  if (isDev) {
    errorObj = err;
    debugServer(err.stack);
  }
  if (err.status === 401 && req.path.indexOf('/api/')!==0) {
    var redirectUrl = utils.encodeURL(req.originalUrl);
    if (req.path.indexOf('/m/') === 0) {
      res.redirect('/m/login?redirectUrl=' + redirectUrl);
    } else {
      var param = redirectUrl === '/secure/404' ? '' : '?redirectUrl=' + redirectUrl;
      res.redirect('/login' + param);
    }
    return;
  }

  if (err.status === 404) {
    res.redirect('/secure/404');
    return;
  }

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: errorObj
  });
};
exports.devErrorHandler = function(err, req, res, next) {
  handleError(true, err, req, res, next);
};
exports.prodErrorHandler = function(err, req, res, next) {
  handleError(false, err, req, res, next);
};