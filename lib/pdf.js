
var fs = require('fs');
var path = require('path');

var cheerio = require('cheerio');
var PDFDocument = require('pdfkit');

TagStyles = {
  'h1': { size: 25, after: 0.5 },
  'h2': { size: 23, after: 0.5 },
  'h3': { size: 21, after: 0.5 },
  'h4': { size: 19, after: 0.5 },
  'h5': { size: 17, after: 0.5 },
  'h6': { size: 15, after: 0.5 },
  'p': { size: 13, after: 1 }
}

function resume(finished) {
  fs.readFile(path.join(__dirname, '../static/resume.html'), function (err, contents) {
    if (err) { finished(null); }

    var doc = new PDFDocument({
      Title: "ZM Resume " + (new Date()).toString(),
      Author: "Zahan Malkani",
      Subject: "Resume"
    });

    var jQ = cheerio.load(contents);

    var selector = Object.keys(TagStyles).join(', ');
    jQ(selector).each(function (i, tag) {
      renderTag(jQ, doc, tag);
    });

    doc.output(function (data) {
      finished(data, 'binary');
    });
  });
}

function renderTag(jQ, doc, tag) {
  var style = TagStyles[ tag.name ];
  if (!style) { console.error('Tag name not found'); return; }
  var innerHTML = jQ(tag).text();
  innerHTML = innerHTML.replace(/\s+/gm, " ").trim();
  if (innerHTML.length > 0) {
    doc.fontSize(style.size);
    doc.text(innerHTML);
    if (style.after) {
      doc.moveDown(style.after);
    }
  }
}

exports.resume = resume;
