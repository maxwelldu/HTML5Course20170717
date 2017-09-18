(function () {
	var oShowLogin = document.querySelector('li[data-name=login]');
	var oShowRegister = document.querySelector('li[data-name=register]');
	var oShowUsername = document.querySelector('li[data-name=username]');
	var oShowLogout = document.querySelector('li[data-name=logout]');
	if (localStorage.username) {
		hidden(oShowLogin);
		hidden(oShowRegister);
		oShowUsername.innerText = localStorage.username;
		show(oShowUsername);
		show(oShowLogout);
	}else{
		show(oShowLogin);
		show(oShowRegister);
		hidden(oShowUsername);
		hidden(oShowLogout);
	}
})();