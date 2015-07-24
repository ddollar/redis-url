# redis-url

Connect to redis using a fully-qualified URL.

## Usage

```js
// Defaults to process.env.REDIS_URL or redis://localhost:6379
var redis = require('redis-url').connect();

// Or you can specify a URL
var redis = require('redis-url').connect(process.env.SOMEREDIS_URL);
```

The module also exposes a `parse` function you can use to extract parts of a
redis URL. It behaves similarly to [node's url.parse](http://goo.gl/o8pXyf),
but adds two extra properties: `password` and `database`.

This feature comes in handy when using redis-backed tools that don't accept
a fully-qualified URL, such as Hapi's
[catbox-redis](https://github.com/hapijs/catbox-redis#readme).  

```js
require("redis-url").parse('redis://:secrets@example.com:1234/9?foo=bar&baz=qux')

{
  protocol: 'redis:',
  slashes: true,
  auth: ':secrets',
  host: 'example.com:1234',
  port: '1234',
  hostname: 'example.com',
  hash: null,
  search: '?foo=bar&baz=qux',
  query: { foo: 'bar', baz: 'qux' },
  pathname: '/9',
  path: '9',
  href: 'redis://:secrets@example.com:1234/9?foo=bar&baz=qux',
  password: 'secrets',
  database: '9'
}
```

## URL format

```
redis://[:password@]host[:port][/db-number][?option=value]
```

**db-number** is a non-negative decimal integer

See [the IANA registration](http://www.iana.org/assignments/uri-schemes/prov/redis) for more details.

## Test

```
redis-server&
npm install
npm test
```

## License

MIT
