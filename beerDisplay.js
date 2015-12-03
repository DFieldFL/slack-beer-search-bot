var breweryDb = require('./breweryDb');
var slack = require('./slack');

module.exports = function (req, res, next) {
  breweryDb.beer(req.body.text, function(data) {
    if(typeof data === 'string' || data instanceof String) {
      res.status(200).send(data);
    } else {
      var thumbUrl = typeof data.labels !== 'undefined' ? data.labels.medium : '';
      var attachments = [slack.createAttachment(data.name, data.id, data.description, data.name, thumbUrl)];
      slack.displayToChat(req.body.channel_id, attachments);
    }
  });
}

