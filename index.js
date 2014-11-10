'use strict';

var mdu = require('markdown-utils');
var _ = require('lodash');

/**
 * Add a basic license statement
 *
 * ```js
 * {%= license() %}
 * //=> Released under the MIT license
 * ```
 *
 * @return {String} Complete license statement.
 */

module.exports = function(locals) {
  var context = {};

  // compatibility with template, verb and assemble.
  if (this && this.root && this.context) {
    context = _.merge({}, this.options, this.root.cache.data, this.context);
  }

  var o = _.merge({}, context, locals);
  var res = 'Released under the ';

  try {
    if (o.licenses) {
      res += _.pluck(o.licenses, 'type').join(', ') + ' license' + (o.licenses.length <= 1 ? '' : 's');
    } else if (o.license) {
      if (typeof o.license === 'object') {
        res += o.license.type + ' license';
      }
      if (typeof o.license === 'string') {
        res += o.license + ' license';
      }
    }

  } catch (err) {
    err.origin = __filename;
    console.warn('No "license" or "licenses" properties found.', err);
  }

  return res;
};
