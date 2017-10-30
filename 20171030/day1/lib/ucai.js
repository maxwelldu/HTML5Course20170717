var UCAI = {
	$: function (id) {
		return document.getElementById(id)
	},
	/**
	 * id: 绑定元素的名称 string
	 * type： 事件的类别 string 'click'
	 * fn： 回调函数 function
	 */
	on: function (id, type, fn) {
		UCAI.$(id)['on' + type] = fn;
	},
	/**
	 * id: 绑定元素的名称 string
	 * html：插入文本的内容 string
	 */
	html: function (id, html) {
		UCAI.$(id).innerHTML = html;
	},
	css: function () {

	}
}
