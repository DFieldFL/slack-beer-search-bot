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
2. Setup command endpoint it to your webserver `http://[domain name]:[port]/[urlPrefix]`

## Usage
### Help
`/beer help`

example command:
`/beer help`

example response:
```
Help:
/[command] search Yuengling
/[command] display 16649
/[command] search SweetWater 420
/[command] help
```

### Search for beer
`/beer search [name of beer]`

example command:
`/beer search Yuengling`

example response:
```
Yuengling Bock Beer id:3kZwor
Yuengling Premium Beer id:2DdatF
Yuengling Light Beer id:eXMP2g
Yuengling Black id:3iNytk
Yuengling Porter id:BGTAQw
```

### Display a beer to the entire chatroom and is linked to the corresponding API
`/beer display [beer id | beer name]`

example command:
`/beer display 3kZwor`
or
`/beer display Yuengling Bock`

example response:
![alt tag](https://cloud.githubusercontent.com/assets/2991478/13671184/6bab57f4-e69c-11e5-8741-78fcd992b7a3.png)

### Display beer of the week to the entire chatroom (does not work if using Untappd API)
`/beer otw`

example command:
`/beer otw`

example response:
![alt tag](https://cloud.githubusercontent.com/assets/2991478/13671184/6bab57f4-e69c-11e5-8741-78fcd992b7a3.png)
