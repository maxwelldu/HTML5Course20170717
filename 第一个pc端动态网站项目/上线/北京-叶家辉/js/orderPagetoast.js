function toast(content, delay) {
  delay = delay || 3000;
  var oDiv = document.createElement('div');
  oDiv.className = 'toast';
  oDiv.innerText = content;
  document.body.appendChild(oDiv);
  oDiv.style.marginTop = - parseInt(fetchComputedStyle(oDiv, 'height')) / 2 + 'px';
  var timer = setInterval(function(){
    document.body.removeChild(oDiv);
    console.log(1);
    clearInterval(timer);
  }, delay);
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
