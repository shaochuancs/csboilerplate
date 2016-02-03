/**
 * Created by cshao on 1/6/16.
 */

"use strict";

var express = require('express');
var router = express.Router();

var secure = require('./secure/index');
var api = require('./api/api');

router.get('/login', function (req, res) {
  res.render('pc/login');
});
router.get('/register', function(req, res) {
  res.render('pc/register');
});

router.use('/secure', secure);
router.use('/api', api);

module.exports = router;