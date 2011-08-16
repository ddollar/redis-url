# redis-url

## Usage

    // use $REDIS_URL or http://localhost:6379
    var redis = require('redis-url').createClient();

    // specify a url
    var redis = require('redis-url').createClient(process.env.SOMEREDIS_URL);

## License

MIT
