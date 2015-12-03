var config = require('./config');
var breweryDb = require('./breweryDb');
var slack = require('./slack');

module.exports = function (req, res, next) {
  if (typeof req.body.text === 'string' || data instanceof String) {
    breweryDb.search(req.body.text, function(data) {
      var brewsText = '';
      if(typeof data === 'string' || data instanceof String) {
        res.status(200).send(data);
      } else {
        var max = data.length > config.searchLimit ? config.searchLimit : data.length;
        brewsText = '';
        for (var i = 0;i < max;i++) {
          brewsText += '*' + data[i].name + '* id: *' + data[i].id + '*\n';
        }
      }
      res.status(200).send(brewsText);
    });
  }
}
