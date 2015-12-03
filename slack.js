var config = require('./config');
var request = require('request');

module.exports = {
  createAttachment: function(name, linkId, description, fallback, thumbUrl) {
    var linkPrefix = config[config.api].beerLinkPrefix
    return {
      title: name,
      title_link: config.linkPrefix + linkId,
      text: description,
      fallback: fallback,
      thumb_url: thumbUrl
    };
  },

  displayToChat: function (channel_id, attachments) {
    request.get(config.slackPostMessage + '?token=' + config.slackToken + '&channel=' + channel_id + '&username=Beer Search' + '&attachments=' + JSON.stringify(attachments));
  }
};
