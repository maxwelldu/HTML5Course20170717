(function () {
	var dom = $('msg_list');
	Observer.regist('addMsg', function (data) {
		// 创建li以及span（关闭按钮）
		var li = document.createElement('li');
		var span = document.createElement('span');
		var text = document.createTextNode(data.data.msg);
		li.appendChild(text);
		li.appendChild(span);
		// 将li插入到ul里
		dom.appendChild(li);
		// 对span绑定点击事件
		span.onclick = function () {
			// 点击span时候，1 删除li，2 发布一条消息
			dom.removeChild(li);
			Observer.fire('deleteMsg');
			// 清除span绑定事件，避免内存泄漏
			span.onclick = null;
		}
		
	})
})()