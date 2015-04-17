/**
 * Created by cshao on 2/26/15.
 */

"use strict";

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pc/index');
});

module.exports = router;