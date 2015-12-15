var config = require('./config');
var beerApi = require('./' + config.api);
var slack = require('./slack');

module.exports = function (req, res, next) {
  if (typeof req.body.text === 'string') {
    beerApi.beer(req.body.text, function(beer) {
      if(typeof beer === 'undefined') {
        res.status(200).send("Sorry we can't find Mike's Hard Lemonade. Try again...");
      } else {
        var attachments = [slack.createAttachment(beer)];
        slack.displayToChat(req.body.channel_id, attachments);
        res.status(200).send();
      }
    });
  }
}

