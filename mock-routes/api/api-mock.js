/**
 * Created by cshao on 10/2/15.
 */

"use strict";

var express = require('express');
var router = express.Router();

var secureMock = require('./secure/api-mock');
router.use('/secure', secureMock);

router.get('/getSampleResult', function(req, res) {
  res.json({result: 'sucess~~'});
});

router.get('/sampleReqURL', function(req, res) {
  res.json({result: 'sample req result'});
});

module.exports = router;