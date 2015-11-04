var brewerydb = require('./brewerydb');
var slack = require('./slack');

module.exports = function (req, res, next) {
  brewerydb.featured(function(data) {
    if(typeof data === 'string' || data instanceof String) {
      res.status(200).send(data);
    } else {
      var beer = data.beer;
      var attachments = [slack.createAttachment(beer.name, beer.id, beer.description, beer.name, beer.labels.medium)];
      slack.displayToChat(req.body.channel_id, attachments);
    }
  });
}

