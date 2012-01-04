
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

server.get('/', function(req, res) {
  res.redirect('/index.html');
});

server.get('/resume', function(req, res) {
  res.redirect('/resume.html');
});

var port = 80;
server.listen(port);

console.log('Server running at http://localhost:' + port + '/');
