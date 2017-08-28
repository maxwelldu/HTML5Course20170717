// version2.0.0
// 这个版本主要修改:
// 1)修改了变量名frameNumber
// 2)让回调函数中的this就是elem
// 3)

function animate(elem , targetJSON , time , callback){
	//动画间隔要根据不同浏览器来设置：
	if(window.navigator.userAgent.indexOf("MSIE") != -1){
		var interval = 50;	
	}else{
		var interval = 20;
	}
	//我们现在要得到现在的状态，当做信号量，这个信号量是所有要变化的属性的集合。
	var semaphoreJSON = {}	//信号量对象
	//给信号量对象添加属性，添加什么属性，目标对象中有什么属性，这里就添加什么属性
	//值就是当前的计算样式
	for(var k in targetJSON){
		semaphoreJSON[k] = parseFloat(fetchComputedStyle(elem , k));
	}

	//我们思考一下，我们的动画是5毫秒执行一次，而用户让我们time毫秒执行完毕动画
	//也就是说，总执行函数次数：
	var maxFrameNumber = time / interval;
	var frameNumber = 0;	//帧编号
	//console.log(maxcount)

	//继续深入思考，动画总次数是maxcount次，那么每一次动画变化的步长就有了啊！
	//所以我们现在要再来一个JSON，放置所有属性的步长
	var stepJSON = {};
	for(var k in targetJSON){
		//捎带脚，把每个targetJSON中的值都去掉px
		targetJSON[k] = parseFloat(targetJSON[k]);
		stepJSON[k] = (targetJSON[k] - semaphoreJSON[k]) / maxFrameNumber;
	}

	//至此，三个非常重要的JSON整理完毕。分别是：
	//信号量JSON ：  semaphoreJSON
	//终点JSON ：  	targetJSON
	//步长JSON ：  stepJSON
	//这三个JSON所有的k都一样。
	// console.log(semaphoreJSON);
	// console.log(targetJSON);
	// console.log(stepJSON);
	//总体思路就是semaphoreJSON每一帧都在变

	//定时器
	var timer = setInterval(function(){
		//要让所有的信号量发生变化
		for(var k in semaphoreJSON){
			//全框架最最核心的语句: 
			semaphoreJSON[k] += stepJSON[k];
			//动：
			//根据是不是opacity来设置单位
			if(k != "opacity"){
				elem.style[k] = semaphoreJSON[k] + "px";
			}else{
				elem.style[k] = semaphoreJSON[k];
				elem.style.filter = "alpha(opacity=" + (semaphoreJSON[k] * 100) + ")";
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
			// callback();
			// callback.call(elem);	//调用回调函数
			callback.apply(elem);
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
}