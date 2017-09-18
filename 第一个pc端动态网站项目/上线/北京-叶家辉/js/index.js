(function(){
  var oNav = document.querySelector('#main-nav');
  var oDt = document.querySelector("#proClassify").querySelector('dt');
  var mainContent = document.querySelector('#mainContent');
  oNav.addEventListener('click',function(event){
    var oLi;
    event = event || window.event;
    var target = event.target || event.srcElement;

    if(target.nodeName === 'A'){
      var ul = target.parentNode.parentNode;
      oLi = ul.querySelectorAll('li');
      localStorage.currentNav = parseInt(target.parentNode.dataset.index);
    }
  },false);

// 判断当前是否是主页面,如果是主页那么就清除本地的currentNav
  function isHome(){
    var pageHref = location.href;
    if(pageHref.indexOf('index.html') !== -1){
      return true;
    }
    return false;
  }

  if(isHome()){
    localStorage.removeItem('currentNav');
    for(var i = 0; i < oLi.length; i++){
      oLi[i].classList.remove('current');
    }
    oDt.classList.add('current');
  }else{
    oDt.classList.remove('current');
  }

  // 显示购物车中商品数量
  showProCount();

})();