(function () {
		function BackToTop(selector) {
	this.dom = null;
	this.selector = selector;
	this.init();
	this.bindEvent();

	 this.bindScrollEvent();

}
BackToTop.prototype.init = function() {
	this.dom = document.querySelector(this.selector);
}

   BackToTop.prototype.bindScrollEvent = function() {
       var self = this;
   	window.addEventListener('scroll',function(){
   		 var scrollTop1 = document.body.scrollTop || document.documentElement.scrollTop;
           if (scrollTop1 > 500) {
               self.dom.style.display = 'block';
           } else {
               self.dom.style.display = 'none';
           }
   	})
   }




BackToTop.prototype.bindEvent = function() {
	 this.dom.onclick = function() {
	  scrollAnimate(0, 1000);
	}

	function scrollAnimate(target, timer) {
	  var interval = 20;
	  var frame = 0;
	  var frames = timer / interval;
	  var start = document.body.scrollTop || document.documentElement.scrollTop;
	  var distance = target - start;
	  var timer;
	  clearInterval(timer);
	  timer = setInterval(function(){
		frame++;
		if (frame >= frames) {
		  clearInterval(timer);
		}
		//第一个参数t表示当前帧
		//第二个b表示起始位置
		//第三个c表示变化量
		//第四个d表示总帧数
		document.body.scrollTop = document.documentElement.scrollTop = CubicEaseInOut(frame, start, distance, frames);
	  }, interval);

	  function CubicEaseInOut(t,b,c,d){
			if ((t/=d/2) < 1) return c/2*t*t*t + b;
			return c/2*((t-=2)*t*t + 2) + b;
		}
	}
}
var backtotop = new BackToTop('#backtotop');
})()