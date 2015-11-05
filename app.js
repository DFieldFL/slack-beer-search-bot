var config = require('./config');
var beerSearch = require('./beerSearch');
var beerDisplay = require('./beerDisplay');
var beerOtw = require('./beerOtw');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || config.listeningPort;

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Beer search route
app.post('/beerSearch', beerSearch);
app.post('/beer', beerDisplay);
app.post('/botw', beerOtw);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});
