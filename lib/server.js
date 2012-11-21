
var path, express, server, port, pdf;

path = require('path');
express = require('express');

pdf = require('./pdf');

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

server.get('/pdf', function (req, res) {
  pdf.test(function (data, encoding) {
    var buf = new Buffer(data, encoding);
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Length': buf.length
    });
    res.write(buf, encoding);
    res.end();
  });
});

port = process.env.PORT || 8080;

server.listen(port, function() {
  console.info('Server running on ' + port);
});
