var config = require('./config');
var requestJson = require('request-json');
var request = require('request');

var client = requestJson.createClient(config.breweryDbUrl);

module.exports = function (req, res, next) {
  client.get('beer/' + req.body.text + '?format=json&key=' + config.breweryDbKey,
    function(err, brewRes, body) {
      if (typeof(body.data) !== 'undefined') {
        var attachments = [{
          title: body.data.name,
          title_link: config.beerLinkPrefix + body.data.id,
          text: body.data.description,
          fallback: body.data.name,
          thumb_url: body.data.labels.medium
        }];
        request.get(config.slackPostMessage + '?token=' + config.slackToken + '&channel=' + req.body.channel_id + '&username=Brewery DB' + '&attachments=' + JSON.stringify(attachments));
      } else {
        res.status(200).send("Were you searching for a Mike's Hard Lemonade? Try again.");
      }
    }
  );
}
