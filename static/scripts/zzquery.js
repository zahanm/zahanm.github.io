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

  global.zz = zz;

})(window || global);
