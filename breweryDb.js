var config = require('./config');
var requestJson = require('request-json');

var client = requestJson.createClient(config.breweryDb.urlPrefix);

module.exports = {
  search: function(searchTerm, callback) {
    client.get('search?q=' + searchTerm + '&' + apiParameters(),
      function(err, brewRes, body) {
        var beers = undefined;
        if (typeof(body.data) !== 'undefined') {
          var beersJson = body.data;
          beers = new Array(beersJson.length);
          for(var i = 0;i < beersJson.length;i++) {
            var beerData = beersJson[i];
            beers[i] = {
              name: beerData.name,
              id: beerData.id
            };
          }
        }
        callback(beers);
      }
    );
  },

  beer: function (beerId, callback) {
    client.get('beer/' + beerId + '?' + apiParameters(),
      function(err, brewRes, body) {
        var beer = undefined;
        if (typeof(body.data) !== 'undefined') {
          var beerData = body.data;
          var thumbUrl = typeof beerData.labels !== 'undefined' ? beerData.labels.medium : '';
          beer = {
            name: beerData.name,
            link: config.breweryDb.beerLinkPrefix + beerData.id,
            description: beerData.description,
            imageUrl: thumbUrl
          };
        }
        callback(beer);
      }
    );
  },

  featured: function(callback) {
    client.get('featured' + '?' + apiParameters(),
      function(err, brewRes, body) {
        var beer = undefined;
        if (typeof(body.data) !== 'undefined' && typeof(body.data.beer) !== 'undefined') {
          var beerData = body.data.beer;
          var thumbUrl = typeof beerData.labels !== 'undefined' ? beerData.labels.medium : '';
          var beer = {
            name: beerData.name,
            link: config.breweryDb.beerLinkPrefix + beerData.id,
            description: beerData.description,
            imageUrl: thumbUrl
          }
        }
        callback(beer);
      }
    );
  }
};

var apiParameters = function() {
  return 'format=json&key=' + config.breweryDb.key;
}
