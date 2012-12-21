
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
[
  { path: "/resume", file: "static/resume.html" },
  { path: "/news/malkani2012", file: "static/news/malkani2012.html" }
].forEach(function (route, i) {

  server.get(route.path, function(req, res) {
    if (route.path === "/news/malkani2012") {
      if (url.parse(req.url, true).query['auth'] !== 'Ab4Xk') {
        res.writeHead(404);
        res.end('Cannot GET ' + req.url);
        return;
      }
    }
    var page = fs.createReadStream(route.file);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    page.pipe(res);
  });

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
