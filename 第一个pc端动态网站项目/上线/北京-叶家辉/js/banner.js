(function(){
  var banner = document.querySelector('#banner');
  var allLi = document.querySelector('.bannerList').querySelectorAll('li');
  var leftBtn = document.querySelector('#leftBtn');
  var circleList = document.querySelector(".circleList");
  var dis = allLi[0].offsetWidth;
  var iNow = 0;
  var timer = null;
  banner.addEventListener('click',function(event){
    event = event || window.event;
    var target = event.target || target.srcElement;
    if(target.id === 'leftBtn'){
      bannerMove('left')
    } else if(target.id === 'rightBtn'){
      bannerMove('right')
    }
  },false);

// 改变底部小圆点样式
// 第一步：根据图片张数自动创建小圆点个数
  for(var i = 0; i < allLi.length; i++){
    circleList.innerHTML += `<li><a href="javascript:(0)"></a></li>`;
  }
// 第二步：让circleList居中
  circleList.style.marginLeft = -circleList.offsetWidth / 2 + "px";

// 第三步：给当前的小圆点加上相应样式
  var allCircleList = circleList.querySelectorAll('a');
  changeClass(allCircleList,iNow,'current');

// 移到相应的小圆点上显示相应的图片
  for(var i = 0; i < allCircleList.length; i++){
    allCircleList[i].onmouseenter = (function(n) {
      return function() {
        if(n > iNow){
          throttleFun(bannerMove,200,{direction:'left',n:n});
        }else if(n < iNow) {
          throttleFun(bannerMove,200,{direction:'right',n:n});
        }
      }
    })(i);
  }

//当鼠标进入banner时清除定时器，鼠标离开时开启,注意这里mouseover和mouseenter的区别
  banner.addEventListener('mouseenter',function(event) {
    clearInterval(timer);
  },false);
  banner.addEventListener('mouseleave',function(event) {
    autoMOve();
  },false);


// 设置自动播放
  function autoMOve(){
    timer = setInterval(function(){
      bannerMove('left');
    },3000);
  }
  autoMOve();

// 控制轮播图移动
  function bannerMove(direction,n){
    if(direction === 'left'){
      animate(allLi[iNow],{left: -dis},300,'Quad.easeOut');
      if(n){
        iNow = parseInt(n);
      }else{
        iNow ++;
        iNow = iNow >= allLi.length  ? 0 : iNow;
      }
      allLi[iNow].style.left = dis + "px";
    } else if(direction === 'right'){
      animate(allLi[iNow],{left: dis},300,'Quad.easeOut');
      if(n || n === 0){
        iNow = parseInt(n);
      }else{
        iNow ++;
        iNow = iNow >= allLi.length  ? 0 : iNow;
      }
      allLi[iNow].style.left = -dis + "px";
    }
    changeClass(allCircleList,iNow,'current');
    animate(allLi[iNow],{left: 0},300,'Quad.easeOut')
  }
})();