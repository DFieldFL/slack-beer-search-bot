var config = require('./config');
var request = require('request-json');

var client = request.createClient(config.breweryDbUrl);

module.exports = function (req, res, next) {
  client.get('search?q=' + req.body.text + '&type=beer&format=json&key=' + config.breweryDbKey,
    function(err, brewRes, body) {
      var brewsText = "Were you searching for a Mike's Hard Lemonade? Try again.";
      if (typeof(body.data) !== 'undefined') {
        var max = body.data.length > config.searchLimit ? config.searchLimit : body.data.length;
        brewsText = '';
        for (var i = 0;i < max;i++) {
          brewsText += '*' + body.data[i].name + '* id: *' + body.data[i].id + '*\n';
        }
      }

      res.status(200).send(brewsText);
    }
  );
}
