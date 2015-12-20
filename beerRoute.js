var config = require('./config');
var beerApi = require('./' + config.api);
var slack = require('./slack');

module.exports = function(req, res, next) {
  var userEntry = req.body.text.trim();
  if(userEntry.length < 1) {
    res.status(200).send('Invalid command please try again\n\n' + help());
    return;
  }

  var command = userEntry.indexOf();
  var search;
  if(userEntry.indexOf(" ") > 0) {
    var splitIndex = userEntry.indexOf(" ");
    command = userEntry.substr(0, splitIndex)
    search = userEntry.substr(userEntry.indexOf(" ") + 1);
  }

  switch(command) {
    case 'help':
      res.status(200).send(help());
    case 'botw':
      beerApi.botw(function(beer) {
        if(typeof beer === 'undefined') {
          res.status(200).send('Sorry there must be a leak in the keg. Try again at a later time...');
        } else {
          var attachments = [slack.createAttachment(beer)];
          slack.displayToChat(req.body.channel_id, attachments);
          res.status(200).send();
        }
      });
    case 'search':
      if(typeof search !== 'undefined') {
        beerApi.search(search, function(beers) {
          var brewsText = "Were you searching for a Mike's Hard Lemonade? Try again...";
          if(typeof beers !== 'undefined') {
            brewsText = '';
            var max = beers.length > config.searchLimit ? config.searchLimit : beers.length;
            for (var i = 0;i < max;i++) {
              brewsText += '*' + beers[i].name + '* id: *' + beers[i].id + '*\n';
            }
          }
          res.status(200).send(brewsText);
        });
        break;
      }
    case 'display':
      if(typeof search !== 'undefined') {
        beerApi.beer(search, function(beer) {
          if(typeof beer === 'undefined') {
            res.status(200).send("Sorry we can't find Mike's Hard Lemonade. Try again...");
          } else {
            var attachments = [slack.createAttachment(beer)];
            slack.displayToChat(req.body.channel_id, attachments);
            res.status(200).send();
          }
        });
        break;
      }
    default:
      res.status(200).send('Invalid command please try again\n\n' + help());
      break;
  }
}

var help = function() {
  return 'Help:\n/[command] search Yuengling\n/[command] beer 16649\n/[command] botw\n/[command] help';
}
