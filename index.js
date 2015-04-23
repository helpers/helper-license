'use strict';

var mdu = require('markdown-utils');
var pluck = require('arr-pluck');
var merge = require('mixin-deep');

module.exports = function license_(locals) {
  var o = locals || {};

  // compatibility with template, verb and assemble.
  if (this && this.app && this.context) {
    o = merge({}, this.options, this.context, o);
  }

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
        res += pluck(o.licenses, 'type').join(', ') + ' license' + (o.licenses.length <= 1 ? '' : 's');
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
    throw new Error('helper-license can\'t find a "license" or "licenses" property: ', err);
  }

  return res;
};
