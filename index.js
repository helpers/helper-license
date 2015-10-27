'use strict';

module.exports = function(config, options) {
  options = options || {};

  if (!config || typeof config !== 'object') {
    throw new TypeError('expected config to be an object');
  }

  var license = config.license;
  if (typeof license !== 'string') {
    throw new TypeError('expected license to be a string');
  }

  var prefix = options.prefix || 'Released under the ';
  var suffix = ' license';
  var res = prefix + license + suffix;

  if (options.linkify === true) {
    var fp = options.filepath || './LICENSE';
    res = prefix + '[' + license + suffix + '](' + fp + ')';
  }

  if (res[res.length - 1] !== '.') {
    res += '.';
  }
  return res;
};
