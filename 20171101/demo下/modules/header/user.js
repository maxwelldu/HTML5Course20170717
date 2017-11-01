MVC.addCtrl('user', function (model, view, observer) {
	observer.regist('openLoginLayer', function(){
		console.log('openLoginLayer');
	});
	observer.regist('openEmailLayer', function(){
		console.log('openEmailLayer');
	});
	observer.regist('openSkinLayer', function(){
		console.log('openSkinLayer');
	});
})
