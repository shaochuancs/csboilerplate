/**
 * Created by cshao on 10/3/15.
 */

"use strict";

var express = require('express');
var router = express.Router();

router.get('/getSampleSecureResult', function(req, res) {
  res.json({result: 'yes'});
});

module.exports = router;