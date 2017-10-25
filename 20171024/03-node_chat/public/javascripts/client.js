var userSelf = {};
var toOneId;
$(function(){
	$('#myModal').modal({
		//backdrop: 'static',
		keyboard: false
	});
	Messenger.options = {
		extraClasses: 'messenger-fixed messenger-on-bottom messenger-on-right',
		theme: 'flat'
	};

	$('.popover-dismiss').popover('show');

	//登录
	$('#btn-setName').click(function(){
		var name = $('#username').val();

		if(checkUser(name)){
			$('#username').val('');
			alert('Nickname already exists or can not be empty!');
		}else{
			var imgList = ["/images/1.jpg","/images/2.jpg","/images/3.jpg","/images/4.jpg","/images/5.jpg"];
			var randomNum = Math.floor(Math.random()*5);
			//随机用户头像
			var img = imgList[randomNum];
			//用户的信息打包
			var dataObj = {
				name:name,
				img:img
			};
			//发送用户信息到服务器
			socket.emit('login',dataObj);
			//隐藏模态框
			$('#myModal').modal('hide');
			$('#username').val('');
			$('#msg').focus();
		}
	});

	//发送给所有人
  $('#sendMsg').click(function(){
    var msg = $('#msg').val();
    if(msg==''){
      alert('Please enter the message content!');
      return;
    }
    var from = userSelf;
    var msgObj = {
      from:from,
      msg:msg
    };
		//提交发送消息
    socket.emit('toAll',msgObj);
    addMsgFromUser(msgObj,true);
    $('#msg').val('');
  });

	//发送图片给所有人
  $('#sendImage').change(function(){
  	if(this.files.length != 0){
  		var file = this.files[0];
  		reader = new FileReader();
  		if(!reader){
  			alert("!your browser doesn\'t support fileReader");
  			return;
  		}
  		reader.onload = function(e){
				//选中的图片是被转换成base64格式后的字符串
  			//console.log(e.target.result);
  			var msgObj = {
  				from:userSelf,
  				img:e.target.result
  			};
  			socket.emit('sendImageToALL',msgObj);
  			addImgFromUser(msgObj,true);
  		};
  		reader.readAsDataURL(file);
  	}
  });

	//给某个用户发送消息
  $('#btn_toOne').click(function(){
  	var msg = $('#input_msgToOne').val();
  	if(msg==''){
      alert('Please enter the message content!');
      return;
    }
  	var msgObj = {
  		from:userSelf,
  		to:toOneId,
  		msg:msg
  	};
  	socket.emit('toOne',msgObj);
  	$('#setMsgToOne').modal('hide');
  	$('#input_msgToOne').val('');
  })
});

//把图片加到界面中，给img的src属性设置为base64格式的字符串就显示出来了
function addImgFromUser(msgObj,isSelf){
	var msgType = isSelf?"message-reply":"message-receive";
	var msgHtml = $('<div><div class="message-info"><div class="user-info"><img src="/images/1.jpg" class="user-avatar img-thumbnail"></div><div class="message-content-box"><div class="arrow"></div><div class="message-content">test</div></div></div></div>');
	msgHtml.addClass(msgType);
	msgHtml.children('.message-info').children('.user-info').children('.user-avatar').attr('src',msgObj.from.img);
	msgHtml.children('.message-info').children('.user-info').children('.user-avatar').attr('title',msgObj.from.name);
	msgHtml.children('.message-info').children('.message-content-box').children('.message-content').html("<img src='"+msgObj.img+"'>");
	$('.msg-content').append(msgHtml);
	//滚动条一直在最底
	$(".msg-content").scrollTop($(".msg-content")[0].scrollHeight);
}

//添加消息到UI
function addMsgFromUser(msgObj,isSelf){
	var msgType = isSelf ? "message-reply" : "message-receive";
	var msgHtml = $('<div><div class="message-info"><div class="user-info"><img src="/images/1.jpg" class="user-avatar img-thumbnail"></div><div class="message-content-box"><div class="arrow"></div><div class="message-content">test</div></div></div></div>');
	msgHtml.addClass(msgType);
	msgHtml.children('.message-info').children('.user-info').children('.user-avatar').attr('src',msgObj.from.img);
	msgHtml.children('.message-info').children('.user-info').children('.user-avatar').attr('title',msgObj.from.name);
	msgHtml.children('.message-info').children('.message-content-box').children('.message-content').text(msgObj.msg);
	$('.msg-content').append(msgHtml);
	//滚动条一直在最底
	$(".msg-content").scrollTop($(".msg-content")[0].scrollHeight);
}
//添加系统消息到UI
function addMsgFromSys(msg){
	$.scojs_message(msg, $.scojs_message.TYPE_OK);
}

//检查用户名是否已存在
function checkUser(name){
	var haveName = false;
	$(".user-content").children('ul').children('li').each(function(){
		if(name == $(this).find('span').text()){
			haveName = true;
		}
	});
	return haveName;
}
function showSetMsgToOne(name,id){
	$('#setMsgToOne').modal();
	$('#myModalLabel1').text("Send to "+name);
	toOneId = id;
}
//添加用户到UI中
function addUser(userList){
	var parentUl = $('.user-content').children('ul');
	var cloneLi = parentUl.children('li:first').clone();
	parentUl.html('');
	parentUl.append(cloneLi);
	for(var i in userList){
		var cloneLi = parentUl.children('li:first').clone();
		cloneLi.children('a').attr('href',"javascript:showSetMsgToOne('"+userList[i].name+"','"+userList[i].id+"');");
		cloneLi.children('a').children('img').attr('src',userList[i].img);
		cloneLi.children('a').children('span').text(userList[i].name);
		cloneLi.show();
		parentUl.append(cloneLi);
	}
}

//回车的时候发送消息
function keywordsMsg(e){
	var event1 = e || window.event;
	if(event1.keyCode == 13){
		$('#sendMsg').click();
	}
}

//回车设置名称
function keywordsName(e){
	var event1 = e || window.event;
	if(event1.keyCode == 13){
		$('#btn-setName').click();
	}
}
//回车给单个用户发送
function keywordsName1(e){
	var event1 = e || window.event;
	if(event1.keyCode == 13){
		$('#btn_toOne').click();
	}
}
