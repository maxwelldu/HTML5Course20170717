
//简单的运动框架 ,运动的目标元素,传入的json(包含我要改变的一些属性的终点值),time是运动的总时长,callback执行完成时调用的函数
function animate(elem, jsonEnd, time, moveWay, callback) {

  //判断用户传入的参数是否合理
  var reg = /^\[object HTML[a-zA-Z]+\]$/;   //该正则用于判断是不是一个dom元素或是一个HTMLObject

  if(arguments.length < 3){
    throw new Error("参数至少要三个才能执行");
  }

  if(!reg.test(Object.prototype.toString.call(elem))){
    throw new Error(elem+"不是一个规范的Dom元素");
  }

  if(!(Object.prototype.toString.call(jsonEnd) === '[object Object]')){
    throw new Error(jsonEnd+"不是一个对象");
  }

  if(!(Object.prototype.toString.call(time) === '[object Number]')){
    throw new Error(time+"不是一个数字");
  }

  if(arguments.length === 3){
    moveWay = 'Linear';
    callback = null;
  }

  if(arguments.length === 4){
    if(Object.prototype.toString.call(arguments[3]) === '[object String]'){
      callback = null;
    }else if(Object.prototype.toString.call(arguments[3]) === '[object Function]'){
      callback = arguments[3];
      moveWay = 'Linear';
    }else {
      throw new Error("最后一个参数,应该是字符型或者是函数");
    }
  }

  if(arguments.length === 5){   //这里应该写函数来进行判断的，而不是用多个if...else...
    if(!(Object.prototype.toString.call(arguments[3]) === '[object String]')){
      throw new Error(moveWay+"应该是字符串");
    }
    if(!(Object.prototype.toString.call(arguments[4]) === '[object Function]')){
      throw new Error(callback+"应该是函数");
    }
  }
  if(arguments.length > 5){
    throw new Error("参数个数过多");
  }

  // 定义每帧的毫秒数
  var interval;

  if (window.navigator.userAgent.indexOf('MSIE') !== -1) {    //判断是否是IE浏览器
    interval = 50;
  } else {
    interval = 20;
  }

  //总帧数：注意这里的中帧数，由计算得到，若不是整数，那么最后的的运动会有细小的误差，因为下面我每次的frame是++的,所以会不准
  //防止这样问题的产生就应该把time或interval值调好
  var frames = time / interval;

  //初始帧
  var frame = 0;

  //信号量：主要用于表示下一步要移动到什么位置,刚开始我们要初始化信号量  semaphore信号量的意思
  var semaphoreJson = {};
  var variationJson = {};      //定义一个变化量json
  var startJson = {};           //定义一个初始值json

  for (var k in jsonEnd) {
    if(k === 'scrollTop' || k === 'scrollLeft'){              //03版这里多了一个scrollTop，scrollLeft的判断
      startJson[k] = elem.body[k] || elem.documentElement[k];
    }else {
      startJson[k] = parseFloat(getStyle(elem, k));
    }
    variationJson[k] = parseFloat(jsonEnd[k]) - startJson[k];
  }

  //根据传入的移动方式来去确定我要调用什么样算法,先将传入的moveWay以.来进行分割，获取到一个数组
  var valArr = moveWay.split(".");
  var positionMethod = null;

  if (valArr.length === 1) {
    positionMethod = Tween[valArr[0]];
  }else if (valArr.length ===2) {
    positionMethod = Tween[valArr[0]][valArr[1]];

  }
  //开启定时器
  var timer = null;
  timer = setInterval(function() {
    frame++;
    for (var k in jsonEnd) {

      semaphoreJson[k] = positionMethod(frame,startJson[k],variationJson[k],frames);

      if (k === 'opacity') {
        elem.style[k] = semaphoreJson[k];
        elem.style[k] = 'filter(alpha = ' + semaphoreJson[k] + ')';
      } else if(k === 'scrollTop' || k === 'scrollLeft') {
        elem.body[k] = elem.documentElement[k] = semaphoreJson[k];
      } else {
        elem.style[k] = semaphoreJson[k] + 'px';
      }
    }

    if (frame >= frames) {

      //在frame运行结束时,将最终状态赋值给当前dom对象,防止细小的出现偏差
      for (var k in jsonEnd) {
        if (k === 'opacity') {
          elem.style[k] = jsonEnd[k];
          elem.style[k] = 'filter(alpha = ' + jsonEnd[k] + ')';
        } else if(k === 'scrollTop' || k === 'scrollLeft'){
          elem.body[k] = elem.documentElement[k] = semaphoreJson[k];
        } else {
          elem.style[k] = jsonEnd[k] + 'px';
        }
      }

      clearInterval(timer);
      if (callback) {           //我们利用call来改变this值，这样下面的目标就不会改变，以后便于修改
        callback.call(elem);
      }
    }
  }, interval);
}

// 获取元素的非行内样式(样式表，style标签内的样式)
//获取浏览器的计算后的样式(可以获取所有的样式)
function getStyle(obj,attr) {

  // 如果是新版本浏览器的话
  if(window.getComputedStyle) {
    attr = attr.replace(/[A-Z]/, function(match) {
      return '-' + match.toLowerCase();
    });
    return window.getComputedStyle(obj)[attr];
  } else {
    attr = attr.replace(/-(a-z)/, function(match1,$1) {
      return $1.toUpperCase();
    });
    return obj.currentStyle[attr];
  }
}


// Tween类 (这是从网上摘的)
//b：表示初始值(beginning value) d:表示运动的总时长(duration) t:表示当前运动的时间(current time) c:变化量(change in value)
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
  Linear: function(t, b, c, d) {
    return c * t / d + b;
  },
  Quad: {
    easeIn: function(t, b, c, d) {
      return c * (t /= d) * t + b;
    },
    easeOut: function(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    },
    easeInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
  },
  Cubic: {
    easeIn: function(t, b, c, d) {
      return c * (t /= d) * t * t + b;
    },
    easeOut: function(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
  },
  Quart: {
    easeIn: function(t, b, c, d) {
      return c * (t /= d) * t * t * t + b;
    },
    easeOut: function(t, b, c, d) {
      return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
  },
  Quint: {
    easeIn: function(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    },
    easeOut: function(t, b, c, d) {
      return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
  },
  Sine: {
    easeIn: function(t, b, c, d) {
      return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOut: function(t, b, c, d) {
      return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOut: function(t, b, c, d) {
      return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
  },
  Expo: {
    easeIn: function(t, b, c, d) {
      return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOut: function(t, b, c, d) {
      return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOut: function(t, b, c, d) {
      if (t == 0) return b;
      if (t == d) return b + c;
      if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
      return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
  },
  Circ: {
    easeIn: function(t, b, c, d) {
      return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOut: function(t, b, c, d) {
      return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },
    easeInOut: function(t, b, c, d) {
      if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
      return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
  },
  Elastic: {
    easeIn: function(t, b, c, d, a, p) {
      if (t == 0) return b;
      if ((t /= d) == 1) return b + c;
      if (!p) p = d * .3;
      if (!a || a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      }
      else var s = p / (2 * Math.PI) * Math.asin(c / a);
      return -(a * Math.pow(2, 10 * (t -= 1)) *
          Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOut: function(t, b, c, d, a, p) {
      if (t == 0) return b;
      if ((t /= d) == 1) return b + c;
      if (!p) p = d * .3;
      if (!a || a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      }
      else var s = p / (2 * Math.PI) * Math.asin(c / a);
      return (a * Math.pow(2, -10 * t) *
          Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    },
    easeInOut: function(t, b, c, d, a, p) {
      if (t == 0) return b;
      if ((t /= d / 2) == 2) return b + c;
      if (!p) p = d * (.3 * 1.5);
      if (!a || a < Math.abs(c)) {
        a = c;
        var s = p / 4;
      }
      else var s = p / (2 * Math.PI) * Math.asin(c / a);
      if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) *
          Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
      return a * Math.pow(2, -10 * (t -= 1)) *
          Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
  },
  Back: {
    easeIn: function(t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOut: function(t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOut: function(t, b, c, d, s) {
      if (s == undefined) s = 1.70158;
      if ((t /= d / 2) < 1) return c / 2 *
          (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
      return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
    },
  },
  Bounce: {
    easeIn: function(t, b, c, d) {
      return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
    },
    easeOut: function(t, b, c, d) {
      if ((t /= d) < (1 / 2.75)) {
        return c * (7.5625 * t * t) + b;
      } else if (t < (2 / 2.75)) {
        return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b;
      } else if (t < (2.5 / 2.75)) {
        return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b;
      } else {
        return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b;
      }
    },
    easeInOut: function(t, b, c, d) {
      if (t < d / 2) return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
      else return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    },
  },
};





