/**
 * Created by cshao on 1/31/15.
 */

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');

var routes = require('./routes/index');
var api = require('./routes/api');

var app = express();

app.engine('html', swig.renderFile);

// view engine setup
app.set('views', path.join(__dirname, 'web/views'));
app.set('view engine', 'html');

app.use(favicon(__dirname + '/web/images/common/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'web'), {'extensions': ['html']}));

/*
  Define routes
 */
app.use('/', routes);
app.use('/api', api);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handlers
if (app.get('env') === 'development') {
  // development error handler, will print stacktrace
  renderError(true);
} else {
  // production error handler, no stacktrace leaked to user
  renderError(false);
}
function renderError(sendErrorObj) {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: sendErrorObj ? err : {}
    });
  });
}

/*
  Configure Swig template
  Override default open/close tag, which conflicts with AngularJS
 */
swig.setDefaults({
  varControls: ['{=', '=}']
});

module.exports = app;
