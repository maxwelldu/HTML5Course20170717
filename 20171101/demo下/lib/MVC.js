var MVC = {};
// 数据层业务逻辑
/**
 * model要读取数据与写入数据，所以我们要定义两个方法
 * get 读取数据的方法
 * add 添加数据的方法
 */
MVC.Model = (function () {
	// 用来存储数据层面的数据
	var M = {};
	return {
		/**
		 * 读取数据的方法（参考迭代器模式的同步变量案例）
		 * @str 	表示属性层级的字符串
		 *
		 * eg： set('a.b.c') => M.a.b.c
		 */
		get: function (str) {
			var path = str.split('.');
			var result = M;
			for (var i = 0; i < path.length; i++) {
				// 读取每一层级的数据
				result = result[path[i]];
				if (undefined === result) {
					return null;
				}
			}
			return result
		},
		/**
		 * 为模型添加数据
		 * @str 	表示属性层级的字符串
		 * @value	表示添加的数据值
		 * 
		 * eg: M 是 {a: {b: {c: 111}}} 
		 * 		add('a.b.c', 111)
		 * 		add('.b', {c: 111})
		 */
		add: function (str, value) {
			var path = str.replace(/^\./, '').split('.');
			// 缓存M数据，方便遍历
			var result = M;

			// 比如我们先给M添加成 {a: {b: {c: 111}}}
			// 第一步，M有a属性没M.a = {}
			// 第二步 {a:{}} M.a 有b属性 M.a.b = {}
			// 第三步 {a:{b:{}}} M.a.b 有c属性么 
			// 第四步 M.a.b.c = 111

			// 遍历path， 最后是赋值参数value值，它是已知的，所以我们要特殊处理，所以遍历path.lenght-1
			for (var i = 0; i < path.length - 1; i++) {
				// 什么样的数据可以添加属性
				// 我们这里的判断是说，当前result有path[i]属性，但是属性的类型不是object
				if (result[path[i]] !== undefined && typeof result[path[i]] !== 'object') {
					throw new Error('非对象类不可以添加属性')
				}
				// 如果reuslt没有该属性，那么我们就要给他添加一个对象	
				if (result[path[i]] === undefined) {
					result[path[i]] = {}
				}
				// 参考get方法，遍历时候一定要缓存住下一级的数据
				result = result[path[i]]
			}
			result[path[i]] = value;
			return this;
		}
	}
})()

// {#a.b.c#}
MVC.template = function (tpl, data) {
	// 现在集合已经不是简单\w集合了，其中还包含., 新的集合是[\w\.]
	return tpl.replace(/\{#([\w\.]+)#\}/g, function (match, key) {
		// 现在匹配到的key已经不是简单的属性了，它是一个层级属性
		// 切分遍历层级属性
		var path = key.split('.');
		// 缓存参数中的data
		var result = data;
		for (var i = 0; i < path.length; i++) {
			// 缓存每一层级的数据
			result = result[path[i]];
			// 如果该数据不存在
			if (result === undefined) {
				// 因为是在格式在字符串，所以我们要返回字符串
				return '';
			}
		}
		return result;
	})
}

/**
 * 视图模块
 * create: 	创建某个视图的
 * add：	添加视图创建方法的
 */ 
MVC.View = (function () {
	// 保存创建视图的所有方法的容器
	var V ={};
	return {
		/**
	 	 * 创建某个视图的
	 	 * @id 	表示视图的模块
		 */
		create: function (id) {
			var view = V[id];
			return view.call(MVC, MVC.Model, MVC.template);
		},
		/**
		 * 添加视图创建方法的
		 * @id 		创建方法的名称
		 * @method 	创建方法的实现
		 */
		add: function (id, method) {
			V[id] = method;
			return this;
		}
	}
})()

/**
 * 控制器模块
 * add： 添加控制器
 * init: 初始化所有控制器
 */
MVC.Controller = (function () {
	// 定义控制器容器保存所用控制器
	var C = {};
	return {
		/**
		 * 初始化所有控制器
		 */
		init: function () {
			for (var i in C) {
				C[i].call(MVC, MVC.Model, MVC.View, MVC.Observer);
			}
		},
		/**
		 * 添加控制器操作
		 * @id		表示控制器的id
		 * @method 	表示控制器的实现方法
		 */
		add: function (id, method) {
			C[id] = method;
			return this;
		}
	}
})()

// 避免Controller.init直接在外部访问
MVC.install = function () {
	window.onload = function () {
		MVC.Controller.init();
	}
}

// 简化MVC.Model.add方法
MVC.addModel = function (key, value) {
	MVC.Model.add(key, value);
	// 将当前对象MVC，我们将他返回出来，那么我们就可以链式添加了
	return this;
}
MVC.addView = function (id, method) {
	MVC.View.add(id, method);
	return this;
}
MVC.addCtrl = function (id, method) {
	MVC.Controller.add(id, method);
	return this;
}

MVC.Observer  = (function () {
	// 消息系统内定一个消息管道，将用户订阅的消息保存起来
	var __message = {};

	return {
		/**
		 * 订阅消息的方法
		 * @type： 	表消息名称
		 * @fn： 	消息的回调函数
		 */
		regist: function (type, fn) {
			// 如果消息管道中已经订阅果这类消息
			if (__message[type]) {
				// 向消息管道中推入消息
				__message[type].push(fn)
			// 如果消息管道中没有订阅过这则消息
			} else {
				// 向消息管道中添加消息，放在数组中的原因是，方便后面继续添加消息
				__message[type] = [fn]
			}
			return this;
		},
		/**
		 * 触发已经订阅过的消息
		 * @type： 	表示消息类型
		 * @data: 	表示消息传递的参数
		 */
		fire: function (type, data) {
			// 首先判断消息是否存在
			if (__message[type]) {
				// 重组传递的数据，将消息的类别传递进来
				var e = {
					type: type,
					data: data
				}
				// 如果存在，就要遍历消息管道中每个回调函数并且执行
				for (var i = 0; i < __message[type].length; i++) {
					// 执行每个回调函数
					__message[type][i](e)
				}
			}
			return this;
		},
		/**
		 * 取消消息订阅
		 * @type: 	消息名称
		 * @fn: 	消息的回调函数的名
		 */
		remove: function (type, fn) {
			// 要想取消某个消息，必须判断该消息存在
			if (__message[type]) {
				// 遍历我们消息消息系统。看有没有该回调函数
				for (var i = __message[type].length - 1; i >= 0; i--) {
					// 如果有这个回调函数
					if (__message[type][i] === fn) {
						// 删除这个回调函数
						__message[type].splice(i, 1);
					}
				}
			}
			return this;
		}
	}
})()