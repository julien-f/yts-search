var request = require('request'),
    rsvp = require('rsvp');


var yts = module.exports = {};


yts.movies = function (query, options) {
  var deferred = rsvp.defer();

  if (query) options.keywords = query;

  var opts = {
    url: 'https://yts.to/api/list.json',
    method: 'get',
    qs: options,
    json: true
  };

  request(opts, function (err, res, body) {
    if (err) return deferred.reject(err);
    if (res.statusCode !== 200) return deferred.reject(res);

    deferred.resolve(body);
  });

  return deferred.promise;
};
