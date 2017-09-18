(function () {
	var oUsername = document.querySelector('input[name=username]');
	var oPassword = document.querySelector('input[name=password]');
	var oErrorMessage = document.querySelector('.errorMessage');
	var oUsernameError = document.querySelector('#username-error');
	var oPasswordError = document.querySelector('#password-error');
	var oRegisterSubmit = document.querySelector('#registerSub');
	var oCheck = document.querySelector('#submit-check');
	oUsername.onblur = function(){
		var reg = /^(\w|\W){3,20}$/;
		if (reg.test(this.value)) {
			hidden(oErrorMessage);
		}else{
			show(oErrorMessage);
			show(oUsernameError);
			hidden(oPasswordError);
			hidden(oCheck);
		}
	}
	oPassword.onblur = function(){
		var reg = /^\w{6,18}$/; 
		if(reg.test(this.value)){
			hidden(oErrorMessage);
		}else{
			show(oErrorMessage);
			show(oPasswordError);
		  hidden(oUsernameError);
		  hidden(oCheck);
		}
	}
	oRegisterSubmit.onclick = function(event){
		event = event || window.event;
		event.preventDefault();
		console.log(1);
		myajax.post('http://h6.duchengjiu.top/shop/api_user.php',{
	      status : 'register',
				username : oUsername.value,
				password : oPassword.value
			},function(error,responseText){
				var json = JSON.parse(responseText);
				console.log(json);
				oCheck.innerText = json.message;
				if (json.code === 0) {
					hidden(oErrorMessage);
					location.href = 'login.html';
				} else{
					show(oErrorMessage);
					hidden(oUsernameError);
					hidden(oPasswordError);
					show(oCheck);
				}
		});
	}
})()
