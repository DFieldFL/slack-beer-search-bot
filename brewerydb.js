var config = require('./config');
var requestJson = require('request-json');

var client = requestJson.createClient(config.breweryDbUrl);

module.exports = {
  beer: function (beerId, callback) {
    client.get('beer/' + beerId + '?format=json&key=' + config.breweryDbKey,
      function(err, brewRes, body) {
        if (typeof(body.data) !== 'undefined') {
          callback(body.data);
        } else {
          callback("Sorry we can't find your Mike's Hard Lemonade. Try again...");
        }
      }
    );
  },

  featured: function(callback) {
    client.get('featured' + '?format=json&key=' + config.breweryDbKey,
      function(err, brewRes, body) {
        if (typeof(body.data) !== 'undefined') {
          callback(body.data);
        } else {
          callback("Sorry there must be a leak in the keg. Try again...");
        }
      }
    );
  }
};
