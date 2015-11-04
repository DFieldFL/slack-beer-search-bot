var config = require('./config');
var request = require('request');

module.exports = {
  createAttachment: function(name, linkId, description, fallback, thumbUrl) {
    return {
      title: name,
      title_link: config.beerLinkPrefix + linkId,
      text: description,
      fallback: fallback,
      thumb_url: thumbUrl
    };
  },

  displayToChat: function (channel_id, attachments) {
    request.get(config.slackPostMessage + '?token=' + config.slackToken + '&channel=' + channel_id + '&username=Brewery DB' + '&attachments=' + JSON.stringify(attachments));
  }
};
