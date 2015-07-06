/* @flow */
'use strict';

document.addEventListener('DOMContentLoaded', renderPage);

function renderPage(): void {
  var fetches: Array<Object> = [
    { loc: "/api/workexp.json", dest: "#workexp" },
    { loc: "/api/teachlead.json", dest: "#teachlead" },
    { loc: "/api/education.json", dest: "#education" },
  ];

  fetches.forEach(function (f) {
    Fetcher.json(f.loc, function (err, data) {
      if (err != null || data == null) {
        throw new Error(`Call to ${f.loc} failed`);
      }
      var destination: ?HTMLElement = document.querySelector(f.dest);
      if (destination == null) {
        throw new Error(`${f.dest} was not found`);
      }
      destination.innerHTML = Mustache.render(destination.innerHTML, data);
    });
  });
}

class Fetcher {
  static json(loc: string, cb: (err: ?Object, data: ?Object) => void): void {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', loc, true);
    xhr.overrideMimeType( "application/json" );
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
    }
  }
}
