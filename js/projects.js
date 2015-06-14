/* @flow */

document.addEventListener('DOMContentLoaded', startup);

function startup(): void {
  var holder: HTMLElement = document.getElementById('content');
  marked.setOptions({
    gfm: true
  });
  fetchPlain('/projects.md', function(err: ?XMLHttpRequest, data: ?string) {
    if (err !== null) {
      console.error('could not get markdown from server', err);
      return;
    }
    holder.innerHTML = marked(data);
  });
}

function fetchPlain(path: string, callback) {
  var xhr = new window.XMLHttpRequest();
  xhr.open('GET', path, true);
  xhr.overrideMimeType("text/plain");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        var data: string = xhr.responseText;
        callback(null, data);
      } else {
        callback(xhr, null);
      }
    }
  }
}
