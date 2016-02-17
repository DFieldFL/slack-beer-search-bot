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
    request.post({
      url: config.slackPostMessage,
      json: true,
      form: {
        token: config.slackToken,
        channel: channel_id,
        username: "Beer Bot",
        attachments: JSON.stringify(attachments)
      }
    }, function(err, httpResponse, body) {
      if(err) {
        console.error(body);
      }
    });
  }
};
