/*!
 * helper-license <https://github.com/jonschlinkert/helper-license>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var should = require('should');
var handlebars = require('handlebars');
var _ = require('lodash');
var licenseHelper = require('./');



describe('license', function () {
  var locals = require('./package');
  var multiple = {
    licenses: [
      {
        type: "CC by 3.0",
        url: "https://github.com/helpers/helper-license/blob/master/LICENSE-CC"
      },
      {
        type: "MIT",
        url: "https://github.com/helpers/helper-license/blob/master/LICENSE-MIT"
      }
    ]
  };

  describe('when `license` is a string:', function () {
    var locals = {license: "MIT"};

    it('should return a formatted license statement:', function () {
      licenseHelper(locals).should.eql('Released under the MIT license');
    });

    it('should linkify a formatted license statement:', function () {
      licenseHelper(locals).should.eql('Released under the MIT license');
    });

    it('should work as a lodash helper:', function () {
      _.template('<%= _license({license: license}) %>', locals, {imports: {_license: licenseHelper}}).should.eql('Released under the MIT license');
    });

    it('should work as a handlebars helper:', function () {
      handlebars.registerHelper('license', licenseHelper);
      handlebars.compile('{{license this}}')(locals).should.eql('Released under the MIT license');
    });
  });
  describe('when `licenses` is formatted as an array:', function () {
    it('should return a formatted license statement:', function () {
      licenseHelper(locals).should.eql('Released under the MIT license');
      licenseHelper(multiple).should.eql('Released under the CC by 3.0, MIT licenses');
    });

    it('should work as a lodash helper:', function () {
      _.template('<%= license({licenses: licenses}) %>', locals, {imports: {license: licenseHelper}}).should.eql('Released under the MIT license');
      _.template('<%= license({licenses: licenses}) %>', multiple, {imports: {license: licenseHelper}}).should.eql('Released under the CC by 3.0, MIT licenses');
    });

    it('should work as a handlebars helper:', function () {
      handlebars.registerHelper('license', licenseHelper);

      handlebars.compile('{{license this}}')(locals).should.eql('Released under the MIT license');
      handlebars.compile('{{license this}}')(multiple).should.eql('Released under the CC by 3.0, MIT licenses');
    });
  });

  describe('when `linkify` is `true`:', function () {
    it('should return a formatted license statement:', function () {
      locals = _.extend({linkify: true}, locals);
      multiple = _.extend({linkify: true}, multiple);
      licenseHelper(locals).should.eql('Released under the [MIT](https://github.com/helpers/helper-license/blob/master/LICENSE-MIT) license');
      licenseHelper(multiple).should.eql('Released under the [CC by 3.0](https://github.com/helpers/helper-license/blob/master/LICENSE-CC), [MIT](https://github.com/helpers/helper-license/blob/master/LICENSE-MIT) licenses');
    });

    it('should work as a lodash helper:', function () {
      _.template('<%= license({licenses: licenses, linkify: true}) %>', locals, {imports: {license: licenseHelper}}).should.eql('Released under the [MIT](https://github.com/helpers/helper-license/blob/master/LICENSE-MIT) license');
      _.template('<%= license({licenses: licenses, linkify: true}) %>', multiple, {imports: {license: licenseHelper}}).should.eql('Released under the [CC by 3.0](https://github.com/helpers/helper-license/blob/master/LICENSE-CC), [MIT](https://github.com/helpers/helper-license/blob/master/LICENSE-MIT) licenses');
    });

    it('should work as a handlebars helper:', function () {
      locals = _.extend({linkify: true}, locals);
      multiple = _.extend({linkify: true}, multiple);
      handlebars.registerHelper('license', licenseHelper);

      handlebars.compile('{{license this}}')(locals).should.eql('Released under the [MIT](https://github.com/helpers/helper-license/blob/master/LICENSE-MIT) license');
      handlebars.compile('{{license this}}')(multiple).should.eql('Released under the [CC by 3.0](https://github.com/helpers/helper-license/blob/master/LICENSE-CC), [MIT](https://github.com/helpers/helper-license/blob/master/LICENSE-MIT) licenses');
    });
  });

  describe('when `license` is an object:', function () {
    var locals = {
      license: {
        "type": "MIT",
        "url": "https://github.com/helpers/helper-license/blob/master/LICENSE-MIT"
      }
    };

    it('should return a formatted license statement:', function () {
      licenseHelper(locals).should.eql('Released under the MIT license');
    });

    it('should linkify a formatted license statement:', function () {
      licenseHelper(_.extend({linkify: true}, locals)).should.eql('Released under the [MIT](https://github.com/helpers/helper-license/blob/master/LICENSE-MIT) license');
    });

    it('should work as a lodash helper:', function () {
      _.template('<%= _license({license: license, linkify: true}) %>', locals, {imports: {_license: licenseHelper}}).should.eql('Released under the [MIT](https://github.com/helpers/helper-license/blob/master/LICENSE-MIT) license');
    });

    it('should work as a handlebars helper:', function () {
      handlebars.registerHelper('license', licenseHelper);
      handlebars.compile('{{license this}}')(_.extend({linkify: true}, locals)).should.eql('Released under the [MIT](https://github.com/helpers/helper-license/blob/master/LICENSE-MIT) license');
    });
  });
});

