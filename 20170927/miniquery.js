function $(selector) {
  return new $.fn.init(selector);
}
$.fn = {
  init: function(selector) {
    var elems = document.querySelectorAll(selector);
    for (var i = 0; i < elems.length; i++) {
      this[i] = elems[i];
    }
    this.length = elems.length;
  },
  html: function(html) {
    for (var i = 0; i < this.length; i++) {
      this[i].innerHTML = html;
    }
    return this;
  },
  css: function(k, v) {
    for (var i = 0; i < this.length; i++) {
      this[i].style[k] = v;
    }
    return this;
  }
}
$.fn.init.prototype = $.fn;
$.ajax = function(opt){
  var url = opt.url;
  var type = opt.type;
  var dataType = opt.dataType;
  var data = opt.data;
  var success = opt.success;

  if (dataType === 'jsonp') {
    var callbackname = opt.jsonpCallback;
    window[callbackname] = success;
    var oScript = document.createElement('script');
    document.body.appendChild(oScript);
    oScript.src = url;
    document.body.removeChild(oScript);
  } else {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === xhr.DONE) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
          if (typeof success === 'function') {
            if (dataType === 'json') {
              success(JSON.parse(xhr.responseText));
            }
          }
        }
      }
    }
    xhr.open(type, url, true);
    xhr.send();
  }
}
