MVC
.addModel('slider', {
	data: [
		{
			"icon": "01.png",
			"iconTitle": "萌主页",
			"title": "当女孩遇到熊",
			"content": "深山里有萝莉出没",
			"img": "01.png"
		},
		{
			"icon": "02.jpg",
			"iconTitle": "动漫",
			"title": "会说话的汤姆猫",
			"content": "汤姆猫给你讲故事",
			"img": "02.png"
		},
		{
			"icon": "03.png",
			"iconTitle": "LOL直播",
			"title": "中单蚂蚱输出爆炸",
			"content": "JY解说",
			"img": "03.jpg"
		},
		{
			"icon": "04.png",
			"iconTitle": "景点门票",
			"title": "厦门方特梦幻王国",
			"content": "跟着跑男一起狂欢",
			"img": "04.jpg"
		},
		{
			"icon": "05.png",
			"iconTitle": "hao到家",
			"title": "美食送到家",
			"content": "吃货福音私人订制",
			"img": "05.png"
		}
	]
})
.addView('slider1', function (model, template) {
	// 定义步定义容器
	var dom = $('<div id="slider" class="slider"></div>');
	// 获取数据
	// var data = MVC.Model.get('slider')
	var d = model.get('slider')
	console.log( d.data[0].img );
	// 定义模板
	var tpl = [
		'<div class="container"><ul>{#list#}</ul></div>',
		'<div class="arrow"></div>'
	].join('')	// 这是个数组，我们需要的是字符串，所以调用jion方法
	var liTpl = [
		'<li>',
			'<img src="img/slider_icon_{#icon#}" alt="" />',
			'<p>{#iconTitle#}</p>',
			'<div>',
				'<img src="img/slider_img_{#img#}" alt="" />',
				'<h4>{#title#}</h4>',
				'<p>{#content#}</p>',
			'</div>',
		'</li>'
	].join('');
	// 定义模板字符串
	var html = liHtml = '';
	// 格式化模板
	for (var i = 0; i < d.data.length; i++) {
		liHtml += template(liTpl, d.data[i])
	}
	html = template(tpl, {
		list: liHtml
	});
	// 插入页面中
	dom.html(html)
	dom.appendTo('body');
	return dom;
})
.addCtrl('slidercgccvcvbc', function (model, view) {
	var dom = view.create('slider1');
	// 添加箭头按钮的交互
	dom.delegate('.arrow', 'click', function () {
		// 当按钮有close，说明现在是关闭状态，此时点击，就要显示容器，并将按钮的close类取消掉
		if ($(this).hasClass('close')) {
			// 取消close类
			$(this).removeClass('close');
			// 将容器显示出来
			dom.find('.container').animate({marginLeft: 0}, 200)
		// 否则按钮没有close类， 说明现在是打开状态，此时点击，就要关闭容器，并添加按钮的close类
		} else {
			$(this).addClass('close');
			dom.find('.container').animate({marginLeft: -50}, 200)
		}
	})
})