# Slack Brewry DB search
## Installation/Setup
### Server
This node application runs using node v0.12.7 or newer.

1. Clone repo to your webserver
2. Copy config.templ.js to config.js
3. Set values in config.js
  1. Determine what API you want to use
    1. api - Set to 'untappd' if using the Untappd API or 'breweryDb' if using Brewery DB API
    2. Untappd
      1. untappd.clientId - Get from https://untappd.com/api/docs/v4
      2. untappd.clientSecret - Ditto
    3. Brewery DB
      1. brewerydb.key - Get from http://brewerydb.com
  2. slackToken - Get from slack https://api.slack.com/web
  3. searchLimit - Change the max number of search results that should be returned
  4. urlPrefix - (Optional) If you want to run the service under a sub URL (ex. http://foo.com/bar) add the prefix to this config option (ex. '/bar' if using http://foo.com/bar)
4. Run `npm install`
5. Start sever `node app`

### Slack Command
1. Go to `https://[company name].slack.com/services/new/slash-commands`
2. Setup command for search and point it to your webserver `http://[domain name]:[port]/beerSearch`
3. Setup command for single beer display and point it to your webserver `http://[domain name]:[port]/beer`
4. Setup command for displaying the beer of the week and point it to your webserver `http://[domain name]:[port]/botw`

## Usage
### Search for beer
`/beerSearch [name of beer]`

example command:
`/beerSearch Yuengling`

example response:
```
Yuengling Bock Beer id:3kZwor
Yuengling Premium Beer id:2DdatF
Yuengling Light Beer id:eXMP2g
Yuengling Black id:3iNytk
Yuengling Porter id:BGTAQw
```

### Display a beer to the entire chatroom
`/beer [beer id]`

example command:
`/beer 3kZwor`

example response:
```
Yuengling Bock Beer
In celebration of our 180th Anniversary year, the marketplace will see one of the first seasonal offerings from the Yuengling Brewery in many years. Yuengling has produced a Bock Beer in its long and storied past, and we have now reinvented that product for limited release in 2009. The new brew is dark brown in color and offers exceptional flavor that lives up to the quality Yuengling drinkers have grown to expect. Yuengling Bock Beer will be offered in barrels only, beginning in late Show more...
```

### Display beer of the week to the entire chatroom (does not work if using Untappd API)
`/botw`

example command:
`/botw`

example response:
```
Yuengling Bock Beer
In celebration of our 180th Anniversary year, the marketplace will see one of the first seasonal offerings from the Yuengling Brewery in many years. Yuengling has produced a Bock Beer in its long and storied past, and we have now reinvented that product for limited release in 2009. The new brew is dark brown in color and offers exceptional flavor that lives up to the quality Yuengling drinkers have grown to expect. Yuengling Bock Beer will be offered in barrels only, beginning in late Show more...
```
