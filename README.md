# Slack Brewry DB search
## Installation/Setup
### Server
This node application runs using node v0.12.7 or newer.

1. Clone repo to your webserver
2. Copy config.templ.js to config.js
3. Set values in config.js
4. Run `npm install`
5. Start sever `node app`
### Slack Command
1. Go to `https://[company name].slack.com/services/new/slash-commands`
2. Setup command for search and point it to your webserver `http://[domain name]:[port]/beerSearch
2. Setup command for single beer display and point it to your webserver `http://[domain name]:[port]/beer
