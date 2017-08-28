// version2.0.1
// 这个版本主要修改:
// 1)修改了变量名frameNumber
// 2)让回调函数中的this就是elem
// 3)增加了缓冲功能
// 4)函数的重载
// 5)为了函数节流方便，我们给运动的这个对象添加了一个属性isanimated，动画的时候这个属性是true，动画停止就是false。

/*
 * animate函数是动画封装函数
 * @para0  elem参数就是运动的对象
 * @para1  targetJSON参数就是运动的终点状态，可以写px，也可以不写px
 * @para2  time是运动总时间，毫秒为单位
 * @para3  tweenString缓冲描述词，比如"Linear"，可选
 * @para4  callback是回调函数，可选
 * return	本函数没有返回值
*/
function animate(elem , targetJSON , time , tweenString , callback){
	//函数重载，用户传进来的参数数量、类型可能不一样
	//检查数量和类型
	if(arguments.length < 3 || typeof arguments[0] != "object" || typeof arguments[1] != "object" || typeof arguments[2] != "number"){
		throw new Error("对不起，你传进来的参数数量不对或者参数类型不对，请仔细检查哦！");
		return;
	}else if(arguments.length == 3){
		//用户只传进来3个参数，表示tweenString、callback被省略了，那么我们默认使用Linear当做缓冲词
		tweenString = "Linear";
		//默认回调函数是null
		callback = null;
	}else if(arguments.length == 4){
		//用户只传进来4个参数，第4个参数可能传进来的是tweenString，也可能是callback
		switch(typeof arguments[3]){
			case "string" : 
				//用户传进来的是缓冲描述词儿，所以就把callback补为null
				callback = null;
				break;
			case "function" : 
				callback = arguments[3];
				tweenString = "Linear";
				break;
			default : 
				throw new Error("抱歉，第4个参数要么是缓冲描述词，要么是回调函数，请检查！");
		}
	}

	//动画间隔要根据不同浏览器来设置：
	if(window.navigator.userAgent.indexOf("MSIE") != -1){
		var interval = 50;	
	}else{
		var interval = 20;
	}

	//强行给我们的动画元素增加一个isanimated的属性，是否正在运动
	elem.isanimated = true;

	//初始状态，放在origninalJSON里面
	var originalJSON = {};
	//变化的多少，放在deltaJSON里面
	var deltaJSON = {};
	//给信号量对象添加属性，添加什么属性，目标对象中有什么属性，这里就添加什么属性
	//值就是当前的计算样式
	for(var k in targetJSON){
		//初试JSON
		originalJSON[k] = parseFloat(fetchComputedStyle(elem , k));
		//把每个targetJSON中的值都去掉px
		targetJSON[k] = parseFloat(targetJSON[k]);
		//变化量JSON
		deltaJSON[k] = targetJSON[k] - originalJSON[k];
	}

	// 至此我们得到了三个JSON：
	// originalJSON 初始状态集合，这个JSON永远不变
	// targetJSON 目标状态集合，这个JSON永远不变
	// deltaJSON  差值集合，这个JSON永远不变
	// console.log(originalJSON);
	// console.log(targetJSON);
	// console.log(deltaJSON);

	//总执行函数次数：
	var maxFrameNumber = time / interval;
	//当前帧编号
	var frameNumber = 0;
	//这是一个临时变量一会儿用	
	var n;
	//定时器
	var timer = setInterval(function(){
		//要让所有的属性发生变化
		for(var k in originalJSON){
			//动：
			// n就表示这一帧应该在的位置：
			n = Tween[tweenString](frameNumber , originalJSON[k] , deltaJSON[k] , maxFrameNumber);
			//根据是不是opacity来设置单位
			if(k != "opacity"){
				elem.style[k] = n + "px";
			}else{
				elem.style[k] = n;
				elem.style.filter = "alpha(opacity=" + n * 100 + ")";
			}
		}

		//计数器
		frameNumber++;
		if(frameNumber == maxFrameNumber){
			//次数够了，所以停表。
			//这里抖一个小机灵，我们强行让elem跑到targetJSON那个位置
			for(var k in targetJSON){
				if(k != "opacity"){
					elem.style[k] = targetJSON[k] + "px";
				}else{
					elem.style[k] = targetJSON[k];
					elem.style.filter = "alpha(opacity=" + (targetJSON[k] * 100) + ")";
				}
			}
			//停表
			clearInterval(timer);
			//拿掉是否在动属性，设为false
			elem.isanimated = false;
			//调用回调函数，并且让回调函数中的this表示运动的对象
			//我们加上了判断，如果callback存在，再执行函数
			callback && callback.apply(elem);
		}
	},interval);

	//之前的轮子，计算后样式
	function fetchComputedStyle(obj , property){
		//能力检测
		if(window.getComputedStyle){
			//现在要把用户输入的property中检测一下是不是驼峰，转为连字符写法
			//强制把用户输入的词儿里面的大写字母，变为小写字母加-
			//paddingLeft  →  padding-left
			property = property.replace(/([A-Z])/g , function(match,$1){
				return "-" + $1.toLowerCase();
			});

			return window.getComputedStyle(obj)[property];
		}else{
			//IE只认识驼峰，我们要防止用户输入短横，要把短横改为大写字母
			//padding-left  → paddingLeft 
			property = property.replace(/\-([a-z])/g , function(match,$1){
				return $1.toUpperCase();
			});

			return obj.currentStyle[property];
		}
	}

	//缓冲的各种公式
	var Tween = { 
		Linear: function(t, b, c, d) {
	        return c * t / d + b;
	    },
	    //二次的
	    QuadEaseIn: function(t, b, c, d) {
	        return c * (t /= d) * t + b;
	    },
	    QuadEaseOut: function(t, b, c, d) {
	        return -c * (t /= d) * (t - 2) + b;
	    },
	    QuadEaseInOut: function(t, b, c, d) {
	        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
	        return -c / 2 * ((--t) * (t - 2) - 1) + b;
	    },
	    //三次的
	    CubicEaseIn: function(t, b, c, d) {
	        return c * (t /= d) * t * t + b;
	    },
	    CubicEaseOut: function(t, b, c, d) {
	        return c * ((t = t / d - 1) * t * t + 1) + b;
	    },
	    CubicEaseInOut: function(t, b, c, d) {
	        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
	        return c / 2 * ((t -= 2) * t * t + 2) + b;
	    },
	    //四次的
	    QuartEaseIn: function(t, b, c, d) {
	        return c * (t /= d) * t * t * t + b;
	    },
	    QuartEaseOut: function(t, b, c, d) {
	        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	    },
	    QuartEaseInOut: function(t, b, c, d) {
	        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
	        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	    },
	    QuartEaseIn: function(t, b, c, d) {
	        return c * (t /= d) * t * t * t * t + b;
	    },
	    QuartEaseOut: function(t, b, c, d) {
	        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
	    },
	    QuartEaseInOut: function(t, b, c, d) {
	        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
	        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
	    },
	    //正弦的
	    SineEaseIn: function(t, b, c, d) {
	        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	    },
	    SineEaseOut: function(t, b, c, d) {
	        return c * Math.sin(t / d * (Math.PI / 2)) + b;
	    },
	    SineEaseInOut: function(t, b, c, d) {
	        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	    },
	    ExpoEaseIn: function(t, b, c, d) {
	        return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
	    },
	    ExpoEaseOut: function(t, b, c, d) {
	        return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
	    },
	    ExpoEaseInOut: function(t, b, c, d) {
	        if (t == 0) return b;
	        if (t == d) return b + c;
	        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
	        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
	    },
	    CircEaseIn: function(t, b, c, d) {
	        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
	    },
	    CircEaseOut: function(t, b, c, d) {
	        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
	    },
	    CircEaseInOut: function(t, b, c, d) {
	        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
	        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
	    },
	    ElasticEaseIn: function(t, b, c, d, a, p) {
	        if (t == 0) return b;
	        if ((t /= d) == 1) return b + c;
	        if (!p) p = d * .3;
	        if (!a || a < Math.abs(c)) {
	            a = c;
	            var s = p / 4;
	        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	    },
	    ElasticEaseOut: function(t, b, c, d, a, p) {
	        if (t == 0) return b;
	        if ((t /= d) == 1) return b + c;
	        if (!p) p = d * .3;
	        if (!a || a < Math.abs(c)) {
	            a = c;
	            var s = p / 4;
	        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
	    },
	    ElasticEaseInOut: function(t, b, c, d, a, p) {
	        if (t == 0) return b;
	        if ((t /= d / 2) == 2) return b + c;
	        if (!p) p = d * (.3 * 1.5);
	        if (!a || a < Math.abs(c)) {
	            a = c;
	            var s = p / 4;
	        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
	        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
	    },
	    //冲过头系列
	    BackEaseIn: function(t, b, c, d, s) {
	        if (s == undefined) s = 1.70158;
	        return c * (t /= d) * t * ((s + 1) * t - s) + b;
	    },
	    BackEaseOut: function(t, b, c, d, s ) {
	        if (s == undefined) s = 1.70158;
	        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	    },
	    BackEaseInOut: function(t, b, c, d, s) {
	        if (s == undefined) s = 1.70158;
	        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b;
	        return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b;
	    },
	    //弹跳系列
	    BounceEaseIn: function(t, b, c, d) {
	        return c - Tween.BounceEaseOut(d - t, 0, c, d) + b;
	    },
	    BounceEaseOut: function(t, b, c, d) {
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
	    BounceEaseInOut: function(t, b, c, d) {
	        if (t < d / 2) return Tween.BounceEaseIn(t * 2, 0, c, d) * .5 + b;
	        else return Tween.BounceEaseOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
	    }
	};
}


