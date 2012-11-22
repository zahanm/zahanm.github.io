
"use strict";

var fs = require('fs');
var path = require('path');

var cheerio = require('cheerio');
var PDFDocument = require('pdfkit');

var TagStyles = {
  'h1': { size: 18, after: 0.5 },
  'h2': { size: 17, after: 0.5 },
  'h3': { size: 16, after: 0.5 },
  'h4': { size: 15, after: 0.5 },
  'h5': { size: 13, after: 0.5 },
  'h6': { size: 12, after: 0.25 },
  'p': { size: 10, after: 1, color: '#000' }
}

var ChildStyles = {
  'small': { sizeDelta: -2, color: '#777', after: 0.25 }
}

var CHILD_TOKEN = "<CHILD></CHILD>";

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

  var selector = Object.keys(ChildStyles).join(', ');
  var childTags = jQ(tag).children(selector);

  if (childTags.length > 0) {
    var childContents = childTags.map(function (i, child) {
      return { name: child.name, text: jQ(child).text() };
    });
    childTags.replaceWith(CHILD_TOKEN);
    var parentContents = jQ(tag).html().replace(/\s+/gm, " ").trim().split(CHILD_TOKEN);

    pdfWrite(style, null, doc, parentContents[0]);
    var i = 0;
    for (i = 0; i < childContents.length; ++i) {
      var childStyle = ChildStyles[ childContents[i].name ];
      if (!childStyle) { console.error('Child tag name not found'); return; }
      pdfWrite(childStyle, style, doc, childContents[i].text);
      pdfWrite(style, null, doc, parentContents[i+1]);
    }
  } else {
    var innerHTML = jQ(tag).text();
    innerHTML = innerHTML.replace(/\s+/gm, " ").trim();
    pdfWrite(style, null, doc, innerHTML);
  }
}

function pdfWrite(style, parentstyle, doc, innerHTML) {
  if (innerHTML.length <= 0) { return; }
  if (style.size) {
    doc.fontSize(style.size);
  } else if (style.sizeDelta) {
    doc.fontSize(parentstyle.size + style.sizeDelta);
  } else {
    doc.fontSize(TagStyles['p'].size);
  }
  if (style.color) {
    doc.fillColor(style.color);
  } else {
    doc.fillColor(TagStyles['p'].color);
  }
  doc.text(innerHTML);
  if (style.after) {
    doc.moveDown(style.after);
  }
}

exports.resume = resume;
