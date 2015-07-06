/* @flow */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

document.addEventListener('DOMContentLoaded', renderPage);

function renderPage() {
  var fetches = [{ loc: '/api/workexp.json', dest: '#workexp' }, { loc: '/api/teachlead.json', dest: '#teachlead' }, { loc: '/api/education.json', dest: '#education' }];

  fetches.forEach(function (f) {
    Fetcher.json(f.loc, function (err, data) {
      if (err != null || data == null) {
        throw new Error('Call to ' + f.loc + ' failed');
      }
      var destination = document.querySelector(f.dest);
      if (destination == null) {
        throw new Error(f.dest + ' was not found');
      }
      destination.innerHTML = Mustache.render(destination.innerHTML, data);
    });
  });
}

var Fetcher = (function () {
  function Fetcher() {
    _classCallCheck(this, Fetcher);
  }

  _createClass(Fetcher, null, [{
    key: 'json',
    value: function json(loc, cb) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', loc, true);
      xhr.overrideMimeType('application/json');
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            var data = JSON.parse(xhr.responseText);
            cb(null, data);
          } else {
            cb(xhr);
          }
        }
      };
    }
  }]);

  return Fetcher;
})();