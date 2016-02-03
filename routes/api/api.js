/**
 * Created by cshao on 1/12/16.
 */

"use strict";

var express = require('express');
var router = express.Router();

var secureAPI = require('./secure/api');

router.use('/secure', secureAPI);

module.exports = router;