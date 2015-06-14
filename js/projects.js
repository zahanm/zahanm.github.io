
document.addEventListener('DOMContentLoaded', startup);

function startup() {
  var holder = document.querySelector('.page');
  marked.setOptions({
    gfm: true
  });
  fetchPlain('/projects.md', function(err, data) {
    if (err !== null) {
      console.error('could not get markdown from server', err);
      return;
    }
    holder.innerHTML = marked(data);
  });
}

function fetchPlain(path, callback) {
  var xhr = new window.XMLHttpRequest();
  xhr.open('GET', path, true);
  xhr.overrideMimeType("text/plain");
  xhr.send();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        var data = xhr.responseText;
        callback(null, data);
      } else {
        callback(xhr, null);
      }
    }
  }
}
