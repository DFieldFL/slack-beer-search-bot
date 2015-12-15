var config = require('./config');
var beerApi = require('./' + config.api);
var slack = require('./slack');

module.exports = function (req, res, next) {
  if (typeof req.body.text === 'string') {
    beerApi.search(req.body.text, function(beers) {
      var brewsText = "Were you searching for a Mike's Hard Lemonade? Try again...";
      if(typeof beers !== 'undefined') {
        brewsText = '';
        var max = beers.length > config.searchLimit ? config.searchLimit : beers.length;
        for (var i = 0;i < max;i++) {
          brewsText += '*' + beers[i].name + '* id: *' + beers[i].id + '*\n';
        }
      }
      res.status(200).send(brewsText);
    });
  }
}
