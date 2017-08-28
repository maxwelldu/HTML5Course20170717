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