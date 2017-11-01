MVC
.addModel('header', {
	weather: {
		city: '北京',
		text: '晴',
		icon: 'a53',
		temperature: '29 ~ 15℃'
	},
	date: {
		month: '5月19日',
		day: '星期四'
	},
	adList: [
		{
			id: '1',
			url: 'ad_1.jpg'
		},
		{
			id: '2',
			url: 'ad_2.jpg'
		},
		{
			id: '3',
			url: 'ad_3.jpg'
		}
	]
})
.addView('header', function (model, template) {
	// 第一步创建容器
	var dom = $('<div class="header" id="header"></div>');
	// 第二步，获取数据
	var data = model.get('header');
	// 第三步 创建视图模板
	var tpl = [
		'<div class="container">',
			'<div class="header-left">',
				'<img src="img/logo.png" alt="" />',
				'<span class="weather">',
					'<strong class="city">{#weather.city#}</strong>',
					'<strong><img src="img/{#weather.icon#}.png" alt="" /> {#weather.text#} {#weather.temperature#}</strong>',
				'</span>',
				'<span class="date"><b>{#date.month#} {#date.day#}</b></span>',
				'<span class="star"><b>星座运势</b></span>',
			'</div>',
			'<div class="header-right">',
				'<ul class="ad">{#list#}</ul>',
				'<span class="user"><b>登录</b></span>',
				'<span class="email"><b>邮箱</b></span>',
				'<span class="browser"><b>浏览器</b></span>',
				'<span class="skin"><b>换肤</b></span>',
			'</div>',
		'</div>'
	].join('');
	listTpl = '<li><img src="img/{#url#}" alt="" /></li>';
	// 第四步定义模板字符串
	var html  = listHtml = '';
	// 第五步格式化模板
	for (var i = 0; i < data.adList.length; i++) {
		listHtml += template(listTpl, data.adList[i]);
	}
	// 当前模板中与data数据对应的属性list没有值，所以我们给他添加一个
	data.list = listHtml;
	html = template(tpl, data);
	// 第六步
	dom.html(html);
	dom.appendTo('#app')
	// 第七步，返回dom
	return dom;
})
.addCtrl('header', function (model, view, observer) {
	var dom = view.create('header');
	// 添加业务逻辑
	dom.delegate('.user', 'click', function () {
		observer.fire('openLoginLayer')
	}).delegate('.email', 'click', function () {
		observer.fire('openEmailLayer')
	}).delegate('.skin', 'click', function () {
		observer.fire('openSkinLayer')
	})
})