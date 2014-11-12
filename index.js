'use strict';

var mdu = require('markdown-utils');
var _ = require('lodash');

/**
 * Add a basic license statement
 *
 * ```js
 * {%= license() %}
 * //=> Released under the MIT license
 *
 * {%= license({linkify: true}) %}
 * //=> Released under the [MIT](https://github.com/jonschlinkert/helper-license/blob/master/LICENSE-MIT) license
 * ```
 *
 * @return {String} Complete license statement.
 */

module.exports = function(locals) {
  var context = {};

  // compatibility with template, verb and assemble.
  if (this && this.app && this.context) {
    context = _.merge({}, this.options, this.app.cache.data, this.context);
  }

  var o = _.merge({}, context, locals);
  var res = 'Released under the ';
  var urls = [];

  try {
    if (o.licenses) {

      if (o.linkify === true) {
        o.licenses.forEach(function (license) {
          if (license.type && license.url) {
            urls.push(mdu.link(license.type, license.url));
          }
        });
      }

      if (urls.length > 0) {
        res += urls.join(', ') + ' license' + (o.licenses.length <= 1 ? '' : 's');
      } else {
        res += _.pluck(o.licenses, 'type').join(', ') + ' license' + (o.licenses.length <= 1 ? '' : 's');
      }

    } else if (o.license) {
      var license;

      if (typeof o.license === 'object') {
        if (o.linkify === true && o.license.type && o.license.url) {
          license = mdu.link(o.license.type, o.license.url);
        } else {
          license = o.license.type;
        }
      }

      if (typeof o.license === 'string') {
        license = o.license;
      }

      res += license + (o.suffix || ' license');
    }

  } catch (err) {
    err.origin = __filename;
    console.warn('No "license" or "licenses" properties found.', err);
  }

  return res;
};
