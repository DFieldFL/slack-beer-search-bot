var config = {
  listeningPort: 3000,
  api: 'untappd',
  breweryDb: {
    key: '',
    urlPrefix: 'https://api.brewerydb.com/v2/',
    beerLinkPrefix: 'http://www.brewerydb.com/beer/'
  },
  untappd: {
    clientId: '',
    clientSecret: '',
    urlPrefix: 'https://api.untappd.com/v4/'
  },
  slackToken: '',
  slackPostMessage: 'https://slack.com/api/chat.postMessage',
  searchLimit: 5
}
module.exports = config;
