var URL = require('url');

module.exports.createClient = module.exports.connect = function(redis_url) {
  var parsed = parse(redis_url || process.env.REDIS_URL || 'redis://localhost:6379')

  var redis = require('redis')
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
  var parsed = URL.parse(url, true)
  parsed.password = (parsed.auth || '').split(':')[1];
  parsed.path = (parsed.pathname || '/').slice(1);
  parsed.database = parsed.path.length ? parsed.path : '0';
  return parsed
}
