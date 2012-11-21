
var trumpet = require('trumpet');
var PDFDocument = require('pdfkit');

function testPDF(finished) {
  var doc = new PDFDocument({
    Title: "ZM Resume " + (new Date()).toString(),
    Author: "Zahan Malkani",
    Subject: "Resume"
  });

  doc.text("Hello world out there");

  doc.output(function (data) {
    finished(data, 'binary');
  });
}

exports.test = testPDF;
