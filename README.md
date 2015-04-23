# helper-license [![NPM version](https://badge.fury.io/js/helper-license.svg)](http://badge.fury.io/js/helper-license)  [![Build Status](https://travis-ci.org/helpers/helper-license.svg)](https://travis-ci.org/helpers/helper-license) 

> Template helper for dynamically generating a basic, one-line license statement based on the given context, e.g. `Released under the MIT license`. Should work with any Handlebars, Lo-Dash, underscore, or any template engine that allows helper functions to be registered.


## Install with [npm](npmjs.org)

```bash
npm i helper-license --save
```

## Usage example

Add a basic license statement to a document with [verb]:

```js
{%= license() %}
//=> Released under the MIT license

{%= license({linkify: true}) %}
//=> Released under the [MIT](https://github.com/jonschlinkert/helper-license/blob/master/LICENSE-MIT) license
```

## Other engines/apps

Add a basic license statement

```js
var pkg = require('./package.json');

// handlebars
Handlebars.compile('{{license this}}')(pkg);
// lo-dash
_.template('<%= license({licenses: licenses}) %>', )
// verb
verb.render('{%= license({licenses: licenses}) %}', pkg);

// all result in:
//=> Released under the MIT license
```

Linkify:

```js
_.template('<%= license({licenses: licenses, linkify: true}) %>', pkg);
//=> Released under the [MIT](https://github.com/jonschlinkert/helper-license/blob/master/LICENSE-MIT) license
```

## Registering the helper

> This should work with any engine, here are a few examples to get you started

### [template]

```js
template.helper('license', require('helper-license'));
```

### [assemble]

```js
assemble.helper('license', require('helper-license'));
```

### [verb]

```js
verb.helper('license', require('helper-license'));
```

### [handlebars]

```js
var handlebars = require('handlebars');
handlebars.registerHelper('license', require('helper-license'));
```

## Related projects
* [helper-copyright](https://github.com/helpers/helper-copyright): Template helper for adding a basic, one-line copyright statement, with… [more](https://github.com/helpers/helper-copyright)
* [helper-reflinks](https://github.com/helpers/helper-reflinks): Template helper for generating a list of markdown formatted reference… [more](https://github.com/helpers/helper-reflinks)
* [helper-related](https://github.com/helpers/helper-related): Template helper for generating a list of links to the… [more](https://github.com/helpers/helper-related)
* [template-helpers](https://github.com/jonschlinkert/template-helpers): Generic JavaScript helpers that can be used with any template… [more](https://github.com/jonschlinkert/template-helpers)
* [verb](https://github.com/assemble/verb): Verb makes it dead simple to generate markdown documentation, using… [more](https://github.com/assemble/verb)

## Running tests
Install dev dependencies:

```bash
npm i -d && npm test
```

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/helpers/helper-license/issues)

## Author
**Jon Schlinkert**

[github/jonschlinkert](https://github.com/jonschlinkert)
[twitter/jonschlinkert](http://twitter.com/jonschlinkert)

## License
Copyright (c) 2015 Jon Schlinkert
Released under the MIT license.

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on April 23, 2015._

<!-- reflinks -->

[template]: https://github.com/jonschlinkert/template
[verb]: https://github.com/assemble/verb
[assemble]: http://assemble.io
[handlebars]: http://www.handlebarsjs.com/
[lodash]: https://lodash.com/


<!-- reflinks generated by verb-reflinks plugin -->

[verb]: https://github.com/assemble/verb
[template]: https://github.com/jonschlinkert/template
[assemble]: http://assemble.io