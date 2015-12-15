var config = require('./config');
var beerApi = require('./' + config.api);
var slack = require('./slack');

module.exports = function (req, res, next) {
  beerApi.featured(function(beer) {
    if(typeof beer === 'undefined') {
      res.status(200).send('Sorry there must be a leak in the keg. Try again at a later time...');
    } else {
      var attachments = [slack.createAttachment(beer)];
      slack.displayToChat(req.body.channel_id, attachments);
      res.status(200).send();
    }
  });
}

