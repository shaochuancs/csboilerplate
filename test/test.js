/**
 * Created by cshao on 10/23/15.
 */

"use strict";

var expect = require('expect.js');
var utils = require('../utils/utils');

describe('Test utils', function(){
  it('URL should be encoded in the correct way', function(){
    expect(utils.encodeURL('http://www.sample.com/home?a=99&b=88')).to.be('http://www.sample.com/home__qm__a__eq__99__and__b__eq__88');
  });
});