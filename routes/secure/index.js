/**
 * Created by cshao on 1/11/16.
 */

"use strict";

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('pc/welcome');
});
router.get('/404', function (req, res) {
  res.render('pc/404');
});

module.exports = router;