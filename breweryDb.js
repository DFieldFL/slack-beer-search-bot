var config = require('./config');
var requestJson = require('request-json');

var client = requestJson.createClient(config.breweryDb.urlPrefix);

module.exports = {
  search: function(searchTerm, callback) {
    client.get('search?q=' + searchTerm + '&' + apiParameters(),
      function(err, brewRes, body) {
        callbackOrBust(body, callback, "Were you searching for a Mike's Hard Lemonade? Try again...");
      });
  },

  beer: function (beerId, callback) {
    client.get('beer/' + beerId + '?' + apiParameters(),
      function(err, brewRes, body) {
        callbackOrBust(body, callback, "Sorry we can't find Mike's Hard Lemonade. Try again...");
      }
    );
  },

  featured: function(callback) {
    client.get('featured' + '?' + apiParameters(),
      function(err, brewRes, body) {
        callbackOrBust(body, callback, 'Sorry there must be a leak in the keg. Try again...');
      }
    );
  }
};

var apiParameters = function() {
  return 'format=json&key=' + config.breweryDb.key;
}

var callbackOrBust = function(body, callback, errMsg) {
  if (typeof(body.data) !== 'undefined') {
    callback(body.data);
  } else {
    callback(errMsg);
  }
}
