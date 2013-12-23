
"use strict";

var fs, url, path, express, server, port, pdf;

fs = require('fs');
url = require('url');
path = require('path');
express = require('express');

pdf = require('./pdf');

server = express();

server.configure(function() {
  server.use(express.logger('tiny'));
  server.use(server.router);
  server.use(express['static'](path.resolve(__dirname, '../static')));
});

server.configure('production', function () {
  // Images served through s3
  // ---
  var s3url = "http://zahanm.s3-website-us-east-1.amazonaws.com/"
  server.get("/img/*", function (req, res) {
    res.redirect(s3url + req.params[0]);
  });
});

server.configure('development', function() {
  server.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
});

// HTML files
// ---
server.get('/resume', function(req, res) {
  var page = fs.createReadStream('static/resume.html');
  res.writeHead(200, { 'Content-Type': 'text/html' });
  page.pipe(res);
});

server.get('/news/malkani/:year', function(req, res) {
  var filename;
  if (req.params.year === '2012' && req.query.auth === 'Ab4Xk') {
    filename = 'static/news/malkani2012.html';
  } else {
    res.writeHead(404);
    res.end('Cannot GET ' + req.url);
    return;
  }
  var page = fs.createReadStream(filename);
  res.writeHead(200, { 'Content-Type': 'text/html' });
  page.pipe(res);
});

// PDF generation
// ---
server.get('/resume.pdf', function (req, res) {
  pdf.resume(function (data, encoding) {
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
