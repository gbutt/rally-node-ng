var express = require('express');
var open = require('open');
var format = require('util').format;

var app = express();
app.use(express.static('examples'));
app.use('/dist', express.static('dist'));
app.use('/node_modules', express.static('node_modules'));

var server = app.listen(3000, 'localhost', function () {
  var host = server.address().address;
  var port = server.address().port;

  var url = format('http://%s:%s', host, port)

  console.log('Example app listening at %s', url);

  open(url);
});

