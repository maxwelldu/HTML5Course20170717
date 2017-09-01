/**
支持传递一个json对象来修改一个元素的多个属性
回调函数的内部this值是调用函数时的第一个参数
缓冲功能
*/
/**
* 文档注释，@param表示参数的意思
* @param elem是运动对象
* @param targetJSON参数是运动的终点状态，可以写px, 也可以不写
* @param time运动总时间，毫秒为单位
* @param tweenString 缓冲描述词，比如："Linear", 可选
* @param callback 回调函数，可选
*/
function animate(elem, targetJSON, time, tweenString, callback) {
  //函数重载，用户传进来的参数数量，类型可能不一样
  //检查数量和类型
  if (
    arguments.length < 3
    || typeof arguments[0] != "object"
    || typeof arguments[1] != "object"
    || typeof arguments[2] != "number"
  ) {
    throw new Error('对不起，你传进来的参数数量不对或者参数类型不对，请仔细检查');
  } else if (arguments.length === 3) {
    //用户只传进来3个参数，表示tweenString、callback被省略了，那么我们默认使用Linear当做缓冲描述词
    tweenString = 'Linear';
    //默认回调函数是null
    callback = null;
  } else if (arguments.length === 4) {
    //用户只传进来4个参数，第4个参数可能传进来的是tweenString, 也可能是callback
    switch (typeof arguments[3]) {
      case "string":
        //用户传进来的是缓冲描述词，所以就把callback设置补为null
        callback = null;
        break;
      case "function":
        callback = arguments[3];
        tweenString = "Linear";
        break;
      default:
        throw new Error('第4个参数要么是缓冲描述词，要么是回调函数，请检查');
    }
  }

  //检查缓冲字符串是否在缓冲对象中
  //拦截器，就是在程序未开始执行之前先判断不合法时就退出; 和表单验证类似
  if (!Tween[tweenString]) {
    throw new Error('缓冲字符串不合法，请检查');
  }

  //动画间隔要根据不同浏览器来设置：
  if (navigator.userAgent.indexOf("MSIE") != -1) {
    var interval = 50;
  } else {
    var interval = 20;
  }

  //初始状态，也表示信号量
  var originalJSON = {};
  //变化量对象
  var deltaJSON = {};
  //给信号量对象添加，添加什么属性，目标对象中有什么属性，这里就添加什么属性
  //值就是当前的计算样式
  for (var k in targetJSON) {
    //初始json
    originalJSON[k] = parseFloat(fetchComputedStyle(elem, k));
    //把每个targetJSON中的值都去掉px
    targetJSON[k] = parseFloat(targetJSON[k]);
    //变化量JSON
    deltaJSON[k] = targetJSON[k] - originalJSON[k];
  }

  //至此，我们得到三个JSON
  // originalJSON  初始状态集合，这个JSON永远不变
  // targetJSON 目标状态集合，这个JSON永远不变
  // deltaJSON 差集集合，这个JSON永远不变

  //总帧数
  var frames = time / interval;
  //当前帧
  var frame = 0;
  //当前的值
  var v;
  //当前动画正在执行
  elem.isAnimated = true;
  //定时器
  var timer = setInterval(function(){
    //要让所有的属性发生变化
    for (var k in originalJSON) {
      //动：
      //v就表示这一帧应该在的位置：
      v = Tween[tweenString](frame, originalJSON[k], deltaJSON[k], frames);
      //根据是不是opacity来设置单位
      if (k != "opacity") {
        elem.style[k] = v + 'px';
      } else {
        elem.style[k] = v;
        elem.style.filter = "alpha(opacity=" + (v*100) + ")";
      }
    }

    frame++;
    if (frame >= frames) {
      //次数够了，停止定时器
      //强行让elem跑到targetJSON那个位置
      for (var k in targetJSON) {
        if (k != "opacity") {
          elem.style[k] = targetJSON[k] + 'px';
        } else {
          elem.style[k] = targetJSON[k];
          elem.style.filter = "alpha(opacity=" + (targetJSON[k]*100) + ")";
        }
      }
      clearInterval(timer);
      elem.isAnimated = false;
      //回调函数
      callback && callback.apply(elem);
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

/*
 * Linear：线性匀速运动效果；
 * Quadratic：二次方的缓动（t^2）；
 * Cubic：三次方的缓动（t^3）；
 * Quartic：四次方的缓动（t^4）；
 * Quintic：五次方的缓动（t^5）；
 * Sinusoidal：正弦曲线的缓动（sin(t)）；
 * Exponential：指数曲线的缓动（2^t）；
 * Circular：圆形曲线的缓动（sqrt(1-t^2)）；
 * Elastic：指数衰减的正弦曲线缓动；
 * Back：超过范围的三次方缓动（(s+1)*t^3 – s*t^2）；
 * Bounce：指数衰减的反弹缓动。
 *
 */
/*
 * easeIn：从0开始加速的缓动，也就是先慢后快；
 * easeOut：减速到0的缓动，也就是先快后慢；
 * easeInOut：前半段从0开始加速，后半段减速到0的缓动。
 *
 */
var Tween = {
	Linear: function(t,b,c,d){ return c*t/d + b; },
	QuadEaseIn: function(t,b,c,d){
		return c*(t/=d)*t + b;
	},
	QuadEaseOut: function(t,b,c,d){
		return -c *(t/=d)*(t-2) + b;
	},
	QuadEaseInOut: function(t,b,c,d){
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	CubicEaseIn: function(t,b,c,d){
		return c*(t/=d)*t*t + b;
	},
	CubicEaseOut: function(t,b,c,d){
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	CubicEaseInOut: function(t,b,c,d){
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	QuartEaseIn: function(t,b,c,d){
		return c*(t/=d)*t*t*t + b;
	},
	QuartEaseOut: function(t,b,c,d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	QuartEaseInOut: function(t,b,c,d){
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	QuintEaseIn: function(t,b,c,d){
		return c*(t/=d)*t*t*t*t + b;
	},
	QuintEaseOut: function(t,b,c,d){
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	QuintEaseInOut: function(t,b,c,d){
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	SineEaseIn: function(t,b,c,d){
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	SineEaseOut: function(t,b,c,d){
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	SineEaseInOut: function(t,b,c,d){
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	ExpoEaseIn: function(t,b,c,d){
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	ExpoEaseOut: function(t,b,c,d){
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	ExpoEaseInOut: function(t,b,c,d){
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	CircEaseIn: function(t,b,c,d){
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	CircEaseOut: function(t,b,c,d){
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	CircEaseInOut: function(t,b,c,d){
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	ElasticEaseIn: function(t,b,c,d,a,p){
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	ElasticEaseOut: function(t,b,c,d,a,p){
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return (a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b);
	},
	ElasticEaseInOut: function(t,b,c,d,a,p){
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (!a || a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	BackEaseIn: function(t,b,c,d,s){
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	BackEaseOut: function(t,b,c,d,s){
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	BackEaseInOut: function(t,b,c,d,s){
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	BounceEaseIn: function(t,b,c,d){
		return c - Tween.BounceEaseOut(d-t, 0, c, d) + b;
	},
	BounceEaseOut: function(t,b,c,d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	BounceEaseInOut: function(t,b,c,d){
		if (t < d/2) return Tween.BounceEaseIn(t*2, 0, c, d) * .5 + b;
		else return Tween.BounceEaseOut(t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
}
