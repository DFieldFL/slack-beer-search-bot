var config = require('./config');
var requestJson = require('request-json');

var client = requestJson.createClient(config.untappd.urlPrefix);

module.exports = {
  search: function(searchTerm, callback) {
    search(searchTerm, callback);
  },

  beer: function(beerId, callback) {
    // Feeling lucky
    if (isNaN(beerId)) {
      search(beerId, function(beers) {
        if(typeof beers !== 'undefined') {
          beerById(beers[0].id, callback);
        } else {
          callback(undefined);
        }
      });
    } else {
      beerById(beerId, callback);
    }
  },

  featured: function(callback) {
    // No featured or beer of the week
    callback(undefined);
  }
};

var apiParameters = function() {
  return 'client_id=' + config.untappd.clientId + '&client_secret=' + config.untappd.clientSecret;
}

var search = function(searchTerm, callback) {
  client.get('search/beer?q=' + searchTerm + '&' + apiParameters(),
    function(err, brewRes, body) {
      var beers = undefined;
      if (typeof(body.response) !== 'undefined' && typeof(body.response.beers) !== 'undefined' && typeof(body.response.beers.items) !== 'undefined') {
        var beersJson = body.response.beers.items;
        beers = new Array(beersJson.length);
        for(var i = 0;i < beersJson.length;i++) {
          var beerData = beersJson[i];
          beers[i] = {
            name: beerData.beer.beer_name + ' - ' + beerData.brewery.brewery_name,
            id: beerData.beer.bid
          };
        }
      }
      callback(beers);
    }
  );
}

var beerById = function(beerId, callback) {
  client.get('beer/info/' + beerId + '?' + apiParameters(),
    function(err, brewRes, body) {
      var beer = undefined;
      if (typeof(body.response) !== 'undefined' && typeof(body.response.beer) !== 'undefined') {
        var beerData = body.response.beer;
        beer = {
          name: beerData.beer_name + ' - ' + beerData.brewery.brewery_name,
          link: config.untappd.beerLinkPrefix + beerData.bid,
          description: 'Rating: ' + beerData.rating_score + ' | ABV: ' + beerData.beer_abv + ' | ' + beerData.beer_description,
          imageUrl: beerData.beer_label
        };
      }
      callback(beer);
    }
  );
}
