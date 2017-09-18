var mainNav =document.querySelector('div[data-name=searchOnTop]');
window.addEventListener('scroll',function() {
  var nowTop = document.documentElement.scrollTop || document.body.scrollTop;
  if(nowTop >= 64) {
  	mainNav.style.display = 'block';
    mainNav.style.position = 'fixed';
    mainNav.style.marginTop = '-'+ 141 + 'px';
  }else {
  	mainNav.style.display = 'none';
    mainNav.style.marginTop = 2 + 'px';
  }
}) 