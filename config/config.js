/**
 * Created by cshao on 5/14/15.
 */

"use strict";

var properties = require('properties');

var options = {
  path: true,
  sections: true
};

module.exports.load = function(callback) {
  properties.parse('config/config.properties', options, function(error, obj) {
    if (error) {
      return console.error(error);
    }

    callback(obj);
  });
}