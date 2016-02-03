/**
 * Created by cshao on 12/1/15.
 */

"use strict";

var debugServer = require('debug')('csboilerplate:server');
var utils = require('./utils');

module.exports = {
  '/api/sampleConnectReqURL': function(res) {
    return utils.getNormalizedStream(res, function(response) {
      var finalResponse = getJSONFromResponse(response);

      //intercept server response here.
      finalResponse.xxx = 49;

      res.json(finalResponse);
    });
  }
};

function getJSONFromResponse(response) {
  var originResponse = JSON.parse(response.toString());
  debugServer(originResponse);
  return originResponse;
}