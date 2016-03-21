/**
 * Created by cshao on 9/21/15.
 */

var debugServer = require('debug')('csboilerplate:server');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var compress = require('compression');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var request = require('request');

var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

require('./utils/db');
var userDAO = require('./utils/user-dao');
var middlewares = require('./middleware/middlewares');
var utils = require('./utils/utils');
var routes = require('./routes/index');

var app = express();

app.engine('html', swig.renderFile);

// view engine setup
app.set('views', path.join(__dirname, 'web/static/compiled/views'));
app.set('view engine', 'html');

app.use(compress());
app.use(favicon(__dirname + '/web/static/images/common/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.configRoute = function(secret) {
  //Extend token expire date
  app.use(function(req, res, next) {
    if (req.cookies.token && req.path.indexOf('/static')!==0) {
      var decoded;
      try {
        decoded = jwt.verify(req.cookies.token, secret);

        // parameter for all view pages
        //res.locals.name = decoded.name;

        req.decodedToken = decoded;
        var expire = req.decodedToken.exp;
        if (new Date().getTime() > expire*1000-utils.TOKEN_EXTEND_DISTANCE_TO_EXPIRE_IN_MILLISECONDS) {
          utils.setTokenCookie(decoded, res);
        }
      } catch(err) {
        debugServer(err);
      }
    }
    next();
  });

  app.post('/authenticate', function (req, res) {
    userDAO.getUserByLoginInfo(req.body.email, req.body.password, function(user) {
      if (!user) {
        res.status(401).send({
          msg: '用户名密码不正确!'
        });
        return;
      }
      var profile = {
        id: user._id,
        email: user.email,
        name: user.name
      };
      utils.setTokenCookie(profile, res);
      res.end();
    });
  });
  app.post('/register', function (req, res) {
    userDAO.addUser(req.body.email, req.body.password, req.body.name, function(result) {
      if (result.result.upserted) {
          res.end();
      } else {
        res.status(409).send({
          msg: '该邮箱已注册'
        });
      }
    });
  });

  var tokenAchieveFunction = function(req) {
    if (req.cookies.token) {
      return req.cookies.token;
    }
    return null;
  };

  app.use('/api/secure', expressJwt({secret: secret, getToken: tokenAchieveFunction}));
  app.use('/m/secure', expressJwt({secret: secret, getToken: tokenAchieveFunction}));
  app.use('/secure', expressJwt({secret: secret, getToken: tokenAchieveFunction}));
  app.use('/', routes);

  app.use('/static', express.static(path.join(__dirname, 'web/static'), {'extensions': ['html', 'js', 'css'], 'maxAge': '7d'}));
};

app.configErrorHandler = function(DEV_MODE) {
  // catch 404 and forward to error handler
  app.use(middlewares.notFoundHandler);

  if (DEV_MODE) {
    app.use(middlewares.devErrorHandler);
  } else {
    app.use(middlewares.prodErrorHandler);
  }
};

app.configTemplate = function(DEV_MODE) {
  app.set('view cache', DEV_MODE ? false : true);

  // Override default open/close tag, which conflicts with AngularJS
  swig.setDefaults({
    cache: DEV_MODE ? false : 'memory',
    varControls: ['{=', '=}'],
    locals: {
      DEV_MODE: DEV_MODE
    }
  });
};

module.exports = app;
