var breweryDb = require('./breweryDb');
var slack = require('./slack');

module.exports = function (req, res, next) {
  breweryDb.featured(function(data) {
    if(typeof data === 'string' || data instanceof String) {
      res.status(200).send(data);
    } else {
      var beer = data.beer;
      var thumbUrl = typeof beer.labels !== 'undefined' ? beer.labels.medium : '';
      var attachments = [slack.createAttachment(beer.name, beer.id, beer.description, beer.name, thumbUrl)];
      slack.displayToChat(req.body.channel_id, attachments);
    }
  });
}

