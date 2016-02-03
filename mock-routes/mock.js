/**
 * Created by cshao on 10/11/15.
 */

"use strict";

var express = require('express');
var router = express.Router();

var api = require('./api/api-mock');

router.use('/api', api);

module.exports = router;