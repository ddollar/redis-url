# redis-url

Connect to redis using a fully-qualified URL

## Usage

```js
// use $REDIS_URL or redis://localhost:6379
var redis = require('redis-url').connect();

// specify a url
var redis = require('redis-url').connect(process.env.SOMEREDIS_URL);
```

## URL format

```
redis://[:password@]host:port[/db-number][?option=value]
```

**db-number** is integer from 1 to 15

## Test

```
redis-server&
npm install
npm test
```

## License

MIT
