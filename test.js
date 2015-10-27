/*!
 * helper-license <https://github.com/helpers/helper-license>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var pkg = require('./package');
var helper = require('./');

describe('license', function () {
  var pkg = {license: "MIT"};

  it('should return a formatted license statement:', function () {
    assert.equal(helper(pkg), 'Released under the MIT license.');
  });

  it('should use the given prefix', function () {
    assert.equal(helper(pkg, {prefix: 'Licensed under the '}), 'Licensed under the MIT license.');
  });

  it('should linkify a formatted license statement:', function () {
    assert.equal(helper(pkg, {linkify: true}), 'Released under the [MIT license](./LICENSE).');
  });
});
