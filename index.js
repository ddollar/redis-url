var URL = require('url');
var qs = require('qs');

module.exports.createClient = module.exports.connect = function(redis_url, redis_module) {
  var parsed = parse(redis_url || process.env.REDIS_URL || 'redis://localhost:6379')

  var redis = (redis_module || require('redis'))
    .createClient(parsed.port, parsed.hostname, parsed.query);

  if (parsed.password) {
    redis.auth(parsed.password, function(err) {
      if (err) throw err;
    });
  }

  redis.select(parsed.database);
  redis.on('connect', function() {
    redis.send_anyways = true
    redis.select(parsed.database);
    redis.send_anyways = false;
  });

  return(redis);
}

var parse = module.exports.parse = function(url) {
  var parsed = URL.parse(url, false, true)

  if (!parsed.slashes && url[0] !== '/') {
    // We require slashes after protocol name, e.g. "redis://whatever:1234"
    // is correct, but "redis:whatever:1234" is not.
    //
    // Therefore, if parser see no slashes, we can assume that protocol is
    // omitted (e.g. "whatever:1234")
    //
    // Just add slashes in this case and try again.
    url = '//' + url
    parsed = URL.parse(url, false, true)
  }

  parsed.query = qs.parse(parsed.query, { allowDots: true });

  parsed.password = (parsed.auth || '').split(':')[1];
  parsed.path = (parsed.pathname || '/').slice(1);
  parsed.database = parsed.path.length ? parsed.path : '0';
  return parsed
}
