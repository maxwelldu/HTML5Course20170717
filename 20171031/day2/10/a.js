(function () {
	var dom = $('msg_num')
	// 添加信息时候，为dom加1
	Observer.regist('addMsg', function () {
		dom.innerHTML = ++dom.innerHTML;
	})
	// 删除信息时候，为dom减1
	Observer.regist('deleteMsg', function () {
		dom.innerHTML = --dom.innerHTML < 0 ? 0 : dom.innerHTML;
	})
})()