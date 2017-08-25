function animate(elem, targetJSON, time, callback) {
  if (window.navigator.userAgent.indexOf("MSIE") != -1) {
    var interval = 50;
  } else {
    var interval = 10;
  }
  var semaphoreJSON = {};
  for (var k in targetJSON) {
    semaphoreJSON[k] = parseFloat(fetchComputedStyle(elem, k));
  }
  var frames = time / interval;
  var frame = 0;
  var stepJSON = {};
  for (var k in targetJSON) {
    stepJSON[k] = (parseFloat(targetJSON[k]) - semaphoreJSON[k]) / frames;
  }
  var timer = setInterval(function() {
    for (var k in semaphoreJSON) {
      semaphoreJSON[k] += stepJSON[k];
      if (k != 'opacity') {
        elem.style[k] = semaphoreJSON[k] + 'px';
      } else {
        elem.style[k] = semaphoreJSON[k];
        elem.style.filter = "alpha(opacity=" + (semaphoreJSON[k]*100) + ")";
      }
    }

    frame++;
    if (frame >= frames) {
      clearInterval(timer);
      callback.call(elem);
    }
  }, interval);
}

function fetchComputedStyle(obj, property) {
  if (window.getComputedStyle) {
    property = property.replace(/[A-Z]/g, function(match){
      return '-' + match.toLowerCase();
    });
    return window.getComputedStyle(obj)[property]; //中括号里面可以是变量
  } else {
    property = property.replace(/-([a-z])/g, function(match, $1){
      return $1.toUpperCase();
    });
    return obj.currentStyle[property];
  }
}
