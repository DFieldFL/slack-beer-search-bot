var config = require('./config');
var request = require('request');

module.exports = {
  createAttachment: function(beer) {
    return {
      title: beer.name,
      title_link: beer.link,
      text: beer.description,
      fallback: beer.name,
      thumb_url: beer.imageUrl
    };
  },

  displayToChat: function (channel_id, attachments) {
    request.get(config.slackPostMessage + '?token=' + config.slackToken + '&channel=' + channel_id + '&username=Beer Search' + '&attachments=' + JSON.stringify(attachments));
  }
};
