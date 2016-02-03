/**
 * Created by cshao on 10/2/15.
 */

var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var middlewares = require('./middleware/middlewares');

var mock = require('./mock-routes/mock');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', mock);

// catch 404 and forward to error handler
app.use(middlewares.notFoundHandler);
app.use(middlewares.devErrorHandler);

module.exports = app;
