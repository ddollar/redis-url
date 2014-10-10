var url = require('url');
var querystring = require('querystring');

module.exports.createClient = module.exports.connect = function(redis_url) {
  var parsed_url  = url.parse(redis_url || process.env.REDIS_URL || 'redis://localhost:6379');
  var parsed_auth = (parsed_url.auth || '').split(':');
  var options = querystring.parse(parsed_url.query);
  var password = parsed_auth[1];
  var path = (parsed_url.pathname || '/').slice(1);
  var database = path.length ? path : '0';

  var redis = require('redis').createClient(parsed_url.port, parsed_url.hostname, options);

  if (password) {
    redis.auth(password, function(err) {
      if (err) throw err;
    });
  }

  redis.select(database);
  redis.on('connect', function() {
    redis.send_anyways = true
    redis.select(database);
    redis.send_anyways = false;
  });

  return(redis);
}
