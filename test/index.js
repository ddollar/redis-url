var test = require("tape")

test("redis-url", function (t) {
  t.plan(2)

  var redis = require('..').createClient()
  var redis2 = require('..').createClient('redis://localhost:6379')

  redis.set('foo', 'bar')
  redis.get('foo', function(err, res) {
    if (err) throw errr
    t.equal(res, 'bar', "foo should equal bar")
    redis.quit()
  })

  redis2.set('food', 'bar')
  redis2.get('food', function(err, res) {
    if (err) throw errr
    t.equal(res, 'bar', "food should equal bar")
    redis2.quit()
  })

})
