
var path = require('path')
  , express = require('express');

var server = express.createServer();

server.configure(function() {
  server.use(express.logger('tiny'));
  server.use(server.router);
  server.use(express.static(path.join(__dirname, '../static')));
});

server.configure('development', function() {
  server.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

server.get('/resume', function(req, res) {
  res.redirect('/resume.html');
});

var port = process.env.PORT || 8080;

server.listen(port, function() {
  console.log('Server running on ' + port);
});

