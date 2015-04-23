/*!
 * helper-license <https://github.com/helpers/helper-license>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('should');
var handlebars = require('handlebars');
var _ = require('lodash');
var helper = require('./');

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
        url: "https://github.com/helpers/helper-license/blob/master/LICENSE"
      }
    ]
  };

  describe('`license` string:', function () {
    var locals = {license: "MIT"};

    it('should return a formatted license statement:', function () {
      helper(locals).should.eql('Released under the MIT license.');
    });

    it('should linkify a formatted license statement:', function () {
      helper(locals).should.eql('Released under the MIT license.');
    });

    it('should work as a lodash helper:', function () {
      _.template('<%= _license({license: license}) %>', {imports: {_license: helper}})(locals).should.eql('Released under the MIT license.');
    });

    it('should work as a handlebars helper:', function () {
      handlebars.registerHelper('license', helper);
      handlebars.compile('{{license this}}')(locals).should.eql('Released under the MIT license.');
    });
  });
  describe('`licenses` array:', function () {
    it('should return a formatted license statement:', function () {
      helper(locals).should.eql('Released under the MIT license.');
      helper(multiple).should.eql('Released under the CC by 3.0, MIT licenses.');
    });

    it('should work as a lodash helper:', function () {
      _.template('<%= _license({license: license}) %>', {imports: {_license: helper}})(locals).should.eql('Released under the MIT license.');
      _.template('<%= license({licenses: licenses}) %>', {imports: {license: helper}})(multiple).should.eql('Released under the CC by 3.0, MIT licenses.');
    });

    it('should work as a handlebars helper:', function () {
      handlebars.registerHelper('license', helper);
      handlebars.compile('{{license this}}')(locals).should.eql('Released under the MIT license.');
      handlebars.compile('{{license this}}')(multiple).should.eql('Released under the CC by 3.0, MIT licenses.');
    });
  });

  describe('when `linkify` is `true`:', function () {
    it('should return a formatted license statement:', function () {
      locals = _.extend({linkify: true}, locals);
      multiple = _.extend({linkify: true}, multiple);
      helper(locals).should.eql('Released under the [MIT](https://github.com/helpers/helper-license/blob/master/LICENSE) license.');
      helper(multiple).should.eql('Released under the [CC by 3.0](https://github.com/helpers/helper-license/blob/master/LICENSE-CC), [MIT](https://github.com/helpers/helper-license/blob/master/LICENSE) licenses.');
    });

    it('should work as a lodash helper:', function () {
      _.template('<%= _license({license: license, linkify: true}) %>', {imports: {_license: helper}})(locals).should.eql('Released under the [MIT](https://github.com/helpers/helper-license/blob/master/LICENSE) license.');
      _.template('<%= license({licenses: licenses, linkify: true}) %>', {imports: {license: helper}})(multiple).should.eql('Released under the [CC by 3.0](https://github.com/helpers/helper-license/blob/master/LICENSE-CC), [MIT](https://github.com/helpers/helper-license/blob/master/LICENSE) licenses.');
    });

    it('should work as a handlebars helper:', function () {
      locals = _.extend({linkify: true}, locals);
      multiple = _.extend({linkify: true}, multiple);
      handlebars.registerHelper('license', helper);

      handlebars.compile('{{license this}}')(locals).should.eql('Released under the [MIT](https://github.com/helpers/helper-license/blob/master/LICENSE) license.');
      handlebars.compile('{{license this}}')(multiple).should.eql('Released under the [CC by 3.0](https://github.com/helpers/helper-license/blob/master/LICENSE-CC), [MIT](https://github.com/helpers/helper-license/blob/master/LICENSE) licenses.');
    });
  });

  describe('when `license` is an object:', function () {
    var locals = {
      license: {
        "type": "MIT",
        "url": "https://github.com/helpers/helper-license/blob/master/LICENSE"
      }
    };

    it('should return a formatted license statement:', function () {
      helper(locals).should.eql('Released under the MIT license.');
    });

    it('should linkify a formatted license statement:', function () {
      helper(_.extend({linkify: true}, locals)).should.eql('Released under the [MIT](https://github.com/helpers/helper-license/blob/master/LICENSE) license.');
    });

    it('should work as a lodash helper:', function () {
      _.template('<%= _license({license: license, linkify: true}) %>', {imports: {_license: helper}})(locals).should.eql('Released under the [MIT](https://github.com/helpers/helper-license/blob/master/LICENSE) license.');
    });

    it('should work as a handlebars helper:', function () {
      handlebars.registerHelper('license', helper);
      handlebars.compile('{{license this}}')(_.extend({linkify: true}, locals)).should.eql('Released under the [MIT](https://github.com/helpers/helper-license/blob/master/LICENSE) license.');
    });
  });
});

