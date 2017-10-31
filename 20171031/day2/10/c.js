// c工程师发布消息的数据接口
/**
 * data.msg: 文本框的内容
 */
(function () {
	var btn = $('msg_submit');
	var text = $('msg_text');
	// 为button绑定click事件
	btn.onclick = function () {
		var value = text.value;
		if (/^\s*$/.test(value)) {
			alert('请输入信息')
			return;
		}
		Observer.fire('addMsg', {
			msg: value
		})
		text.value = '';
	}
	// 判断text的内容是否为空，为空的话，提示，并且返回
	// 发布添加信息消息
	// 将text的内容清空
})()