
var mainNav =document.querySelector('#main-nav');
var topDis = getAllTop(mainNav);
window.onscroll = function(e) {
  var nowTop = document.documentElement.scrollTop || document.body.scrollTop;
  if(nowTop >= topDis) {
    mainNav.style.position = 'fixed';
    mainNav.style.marginTop = 0;
  }else {
    mainNav.style.position = 'relative';
    mainNav.style.marginTop = topDis + 'px';
  }
};

function getAllTop(obj) {
  var allTop = obj.offsetTop;
  while(obj = obj.offsetParent) {
    allTop += obj.offsetTop;
  }
  return allTop;
}