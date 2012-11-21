
var path, express, server, port;

path = require('path');
express = require('express');

server = express();

server.configure(function() {
  server.use(express.logger('tiny'));
  server.use(server.router);
  server.use(express['static'](path.resolve(__dirname, '../static')));
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

port = process.env.PORT || 8080;

server.listen(port, function() {
  console.info('Server running on ' + port);
});
