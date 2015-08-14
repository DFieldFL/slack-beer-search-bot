# Slack Brewry DB search
## Installation/Setup
### Server
This node application runs using node v0.12.7 or newer.

1. Clone repo to your webserver
2. Copy config.templ.js to config.js
3. Set values in config.js
  a. breweryDbKey - Get from http://brewerydb.com so you can use their API for searching
  b. slackToken - Get from slack https://api.slack.com/web
  c. searchLimit - Change the max number of search results that should be returned
4. Run `npm install`
5. Start sever `node app`

### Slack Command
1. Go to `https://[company name].slack.com/services/new/slash-commands`
2. Setup command for search and point it to your webserver `http://[domain name]:[port]/beerSearch
2. Setup command for single beer display and point it to your webserver `http://[domain name]:[port]/beer

## Usage
### Search for beer
`/beerSearch [name of beer]`

example command:
`/beerSearch Yuengling`

### Display a beer to the entire chatroom
`/beer [beer id]`

example command:
`/beer wd1Y84`
