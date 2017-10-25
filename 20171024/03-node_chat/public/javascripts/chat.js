//连接到主机和端口
var socket = io();

//当用户登录或退出，系统提示
socket.on('loginInfo',function(msg){
	addMsgFromSys(msg);
  Messenger().post({
    message: msg,
    showCloseButton: true
  });
});

//添加用户到UI
socket.on('userList',function(userList){
	//修改用户个数
	//modifyUserCount(userList.length);
  addUser(userList);
});

//登录之后客户端查看到用户的信息
socket.on('userInfo',function(userObj){
	//应该使用cookie或者session
	userSelf = userObj;
  $('#spanuser').text('欢迎您！ '+userObj.name);
});

//接收发送的消息
socket.on('toAll',function(msgObj){
  addMsgFromUser(msgObj,false);
});

//接收发送给单个用户的消息
socket.on('toOne',function(msgObj){
  Messenger().post({
    message: "<a href=\"javascript:showSetMsgToOne(\'"+msgObj.from.name+"\',\'"+msgObj.from.id+"\');\">"+msgObj.from.name + " send to you a message:"+ msgObj.msg+"</a>",
    showCloseButton: true
  });
});

//给所有人发送图片
socket.on('sendImageToALL',function(msgObj){
  addImgFromUser(msgObj,false);
});
