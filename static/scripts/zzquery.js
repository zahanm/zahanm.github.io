(function(global) {
  var zz, dReadyListeners, document;

  document = global.document;

  /*******************************************\
  * Queue up events for document 'ready' event
  \*******************************************/

  dReadyListeners = [];
  document.ready = function(listener) {
    dReadyListeners.push(listener);
  };

  // TODO set up listeners for 'ready' event

  // Element.prototype.on = Element.prototype.addEventListener;
  // global.prototype.on = global.prototype.addEventListener;

  /**********************************************\
  * Helper methods attached to `zz` global object
  \**********************************************/

  zz = function(query) {
    return document.querySelectorAll(query);
  };

  zz.debounce = function(listener) {
    // TODO debounce this often called function
  };

  /*
   * Fetches remote json
   * cb's first argument should be error
   */
  zz.json = function (loc, cb) {
    var xhr = new global.XMLHttpRequest();
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
  };

  global.zz = zz;

})(window || global);
