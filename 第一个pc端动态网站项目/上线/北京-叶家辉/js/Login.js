(function () {
	var oUsername = document.querySelector('input[name=username]');
	var oPassword = document.querySelector('input[name=password]');
	var oErrorMessage = document.querySelector('.errorMessage');
	var oUsernameError = document.querySelector('#username-error');
	var oPasswordError = document.querySelector('#password-error');
	var oRegisterSubmit = document.querySelector('#registerSub');
	var oLoginSubmit = document.querySelector('#loginSub');
	var oCheck = document.querySelector('#submit-check');
	oLoginSubmit.onclick = function(event){
		event = event || window.event;
		event.preventDefault();
		console.log(1);
		myajax.post('http://h6.duchengjiu.top/shop/api_user.php',{
				status : 'login',
				username : oUsername.value,
				password : oPassword.value
			},function(error,responseText){
				var json = JSON.parse(responseText);
				console.log(json);
				localStorage.token = json.data.token;
				localStorage.username = json.data.username;
				oCheck.innerText = json.message;
				if (json.code === 0) {
					hidden(oErrorMessage);
					if (localStorage.backurl) {
	        	location.href = localStorage.backurl;
		        } else {
		        	location.href = 'index.html';
		        }
				} else{
					show(oErrorMessage);
					hidden(oUsernameError);
					hidden(oPasswordError);
					show(oCheck);
				}
		});
	}
})()