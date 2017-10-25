var io = require('socket.io')();
var _ = require('underscore');

//api
/*
socket.emit('message', "this is a test");  // 发送给自己
socket.broadcast.emit('message', "this is a test");  // 发送给除自己以外的所有人
socket.broadcast.to('game').emit('message', 'nice game');  // 发送给game房间里面的所有人，除自己以外
io.sockets.emit('message', "this is a test"); // 发送给包括自己的所有人
io.sockets.in('game').emit('message', 'cool game'); // 发送给game房间里面的所有人，包括自己
io.sockets.socket(socketid).emit('message', 'for your eyes only'); // 发给指定socketid的用户
*/

/*user list
Format:[
	{
		name:"",
		img:"",
		socketid:""
	}
]
*/

//保存用户列表
var userList = [];
//var socketList = [];
//监听连接
io.on('connection',function(socket){
	//登录方法
	socket.on('login',function(user){
		//socket.id是一个服务器不会重复的ID，相当于UUID或者GID
		user.id = socket.id;
		userList.push(user);
		//socketList.push(socket);
		//向所有的用户发送用户列表, 包括自己
		io.emit('userList',userList);
		//给自身发一个消息
		socket.emit('userInfo',user);
		//广播发送给所有人，不包括自已
		socket.broadcast.emit('loginInfo',user.name+"上线了。");
	});

	//退出
	socket.on('disconnect',function(){
		var user = _.findWhere(userList,{id:socket.id});
		if(user){
			userList = _.without(userList,user);
			//socketList = _.without(socketList,socket);
			//send the userlist to all client
			io.emit('userList',userList);
			//send login info to all.
			socket.broadcast.emit('loginInfo',user.name+"下线了。");
		}
	});

	//发消息
	socket.on('toAll',function(msgObj){
		/*
			format:{
				from:{
					name:"",
					img:"",
					id:""
				},
				msg:""
			}
		*/
		//广播给自己以外的用户
		socket.broadcast.emit('toAll',msgObj);
	});
	//给所有人发送图片
	socket.on('sendImageToALL',function(msgObj){
		/*
			format:{
				from:{
					name:"",
					img:"",
					id:""
				},
				img:""
			}
		*/
		//查找msgObj.img是不是一个base64格式的图片
		console.log(msgObj);
		socket.broadcast.emit('sendImageToALL',msgObj);
	})


	//给一个用户发送消息
	socket.on('toOne',function(msgObj){
		/*
			format:{
				from:{
					name:"",
					img:"",
					id:""
				},
				to:"",  //socketid
				msg:""
			}
		*/
		//var toSocket = _.findWhere(socketList,{id:msgObj.to});
		//io.sockets.sockets 找当前系统的所有的sockets
		//_.findWhere 是underscore里面查找的方法
		var toSocket = _.findWhere(io.sockets.sockets,{id:msgObj.to});
		console.log(toSocket);
		toSocket.emit('toOne', msgObj);
	});
});

exports.listen = function(_server){
	io.listen(_server);
};
