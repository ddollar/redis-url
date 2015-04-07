var test = require("tape")

test("redis-url", function (t) {
  t.plan(30)

  // Parse a simple URL
  var parts = require('..').parse('redis://localhost:6379')
  t.equal(parts.password, undefined)
  t.equal(parts.host, 'localhost:6379')
  t.equal(parts.hostname, 'localhost')
  t.equal(parts.port, '6379')
  t.equal(parts.path, '')
  t.equal(parts.database, '0')
  t.deepEqual(parts.query, {})

  // Parse a more complex URL
  parts = require('..').parse('redis://:secrets@example.com:1234/9?foo=bar&baz=qux')
  t.equal(parts.password, 'secrets')
  t.equal(parts.host, 'example.com:1234')
  t.equal(parts.hostname, 'example.com')
  t.equal(parts.port, '1234')
  t.equal(parts.path, '9')
  t.equal(parts.database, '9')
  t.deepEqual(parts.query, {foo: 'bar', baz: 'qux'})

  // Simple url, no protocol submitted
  parts = require('..').parse('localhost:6379')
  t.equal(parts.password, undefined)
  t.equal(parts.host, 'localhost:6379')
  t.equal(parts.hostname, 'localhost')
  t.equal(parts.port, '6379')
  t.equal(parts.path, '')
  t.equal(parts.database, '0')
  t.deepEqual(parts.query, {})

  // More complex one
  parts = require('..').parse(':pass@example.com:1234/9?foo=bar&baz=qux')
  t.equal(parts.password, 'pass')
  t.equal(parts.host, 'example.com:1234')
  t.equal(parts.hostname, 'example.com')
  t.equal(parts.port, '1234')
  t.equal(parts.path, '9')
  t.equal(parts.database, '9')
  t.deepEqual(parts.query, {foo: 'bar', baz: 'qux'})

  // Connect to default URL
  var redis = require('..').createClient()
  redis.set('foo', 'bar')
  redis.get('foo', function(err, res) {
    if (err) throw errr
    t.equal(res, 'bar', "foo should equal bar")
    redis.quit()
  })

  // Connect to specified URL
  var redis2 = require('..').createClient('redis://localhost:6379')
  redis2.set('food', 'bar')
  redis2.get('food', function(err, res) {
    if (err) throw errr
    t.equal(res, 'bar', "food should equal bar")
    redis2.quit()
  })

})
