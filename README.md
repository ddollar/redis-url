# redis-url

## Usage

    // use $REDIS_URL or redis://localhost:6379
    var redis = require('redis-url').connect();

    // specify a url
    var redis = require('redis-url').connect(process.env.SOMEREDIS_URL);

## Url format

    redis://[:password]@]host:port[/db-number][?option=value]
**db-number** is integer from 1 to 15

## License

MIT
