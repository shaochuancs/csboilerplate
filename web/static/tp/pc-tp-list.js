/**
 * Created by cshao on 9/21/15.
 */

"use strict";

var commonTP = require('./common-tp-list');

var pcTPList = ['web/static/bower_components/jquery/dist/jquery.min.js',
                'web/static/bower_components/bootstrap/dist/js/bootstrap.min.js',
                'web/static/bower_components/angular/angular.min.js',
                'web/static/bower_components/angular-animate/angular-animate.min.js',
                'web/static/bower_components/js-cookie/src/js.cookie.js'];

module.exports = commonTP.concat(pcTPList);