var game={
	data:null,//游戏启动后是一个二维数组，用来储存每个格子的数字
	RN:4,
	CN:4,
	state:0,
	RUNNING:1,
	GAMEOVER:0,
	score:0,
//	getGridsHtml:function(){
//		for(var row=0,arr=[];row<this.RN;row++){
//			for (var col=0;col<this.CN;col++){
//				arr.push(""+row+col);
//			}
//		}
//		return '<div id="g'+
//			arr.join('" class="grid"></div><div id="g')
//			+'" class="grid"></div>';
//	},
//	getCellsHtml:function(){
//		for(var row=0,arr=[];row<this.RN;row++){
//			for (var col=0;col<this.CN;col++){
//				arr.push(""+row+col);
//			}
//		}
//		return '<div id="c'+
//			arr.join('" class="cell"></div><div id="c')
//			+'" class="cell"></div>';
//	},
	init:function(){
//		this.getGridsHtml();
//		this.getCellsHtml();
	},
	start:function(){
		this.init();
		this.state=this.RUNNING;
		//初始化
//		this.data=[[0,2,2,4],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
		this.data = [];
		for(row=0;row<this.RN;row++){
			this.data[row]=[];
			for(col=0;col<this.CN;col++){
				this.data[row][col]=0;
			}
		}
		this.score=0;
		this.randomNum();
		this.randomNum();
		this.updateView();		
	},
	randomNum:function(){
		if(!this.isFull()){
			while(true){
				var r=parseInt(Math.random()*(this.RN));
				var c=parseInt(Math.random()*(this.CN));
				if(this.data[r][c]==0){				
					this.data[r][c]=Math.random()<0.6?2:4;					                
					break;
				}
			}
		}
	},
	isFull:function(){
		for(row=0;row<this.RN;row++){
			for(col=0;col<this.CN;col++){
				if(this.data[row][col]==0){
					return false;
				}
			}
		}
		return true;
	},
	updateView:function(){
		for(row=0;row<this.RN;row++){
			for(col=0;col<this.CN;col++){
				var num=document.getElementById("c"+row+col);
				if(this.data[row][col]!=0){					
					num.innerHTML=this.data[row][col];
					num.className="cell n"+this.data[row][col];
				}else{
					num.className="cell";
					num.innerHTML="";
				}
			}
		}
		document.getElementById("score").innerHTML=this.score;
		if(this.state==this.GAMEOVER){
			document.getElementById("btns").style.display="block";
			document.getElementById("finalscore").innerHTML=this.score;
		}else if(this.state==this.RUNNING){
			document.getElementById("btns").style.display="none";
		}
	},
//左移操作
	moveLeft:function(){//左移所有行
		var before=this.data.toString();
		for(var row=0;row<this.data.length;row++){
			this.moveLeftInRow(row);
		}
		var after=this.data.toString();
		if(before!=after){
			this.randomNum();//随机生成一个新数
			this.isGameOver();
			this.updateView(); //更新界面
		}		
	},
	moveLeftInRow:function(row){//左移第r行
		for(var col=0;col<this.data[row].length-1;col++){
			//从c开始，找下一个不为0的位置下标next
			var next=this.getRightNext(row,col);
			//如果next==-1，说明都是0了
			if(next==-1){break;}//退出循环
			else{
				if(this.data[row][col]==0){
					this.data[row][col]=this.data[row][next];
					this.data[row][next]=0;
					col--;
				}else if(this.data[row][col]
							==this.data[row][next]){
					this.data[row][col]*=2;
					this.data[row][next]=0;
					this.score+=this.data[row][col];
				}
			}
		}
	},
	getRightNext:function(row,col){//专门找当前位置右侧下一个
		//从c+1开始遍历之后所有元素
		for(var next=col+1;next<this.data[row].length;next++){
			if(this.data[row][next]!=0){//如果找到!=0的
				return next;//返回next
			}
		}//(遍历结束)返回-1
		return -1;
	},
//右移操作
	moveRight:function(){//左移所有行
		var before=this.data.toString();
		for(var row=0;row<this.data.length;row++){
			this.moveRightInRow(row);
		}
		var after=this.data.toString();
		if(before!=after){
			this.randomNum();//随机生成一个新数
			this.isGameOver();
			this.updateView(); //更新界面
		}
	},
	moveRightInRow:function(row){//左移第r行
		for(var col=this.CN-1;col>0;col--){
			//从c开始，找下一个不为0的位置下标next
			var next=this.getLeftNext(row,col);
			//如果next==-1，说明都是0了
			if(next==-1){break;}//退出循环
			else{
				if(this.data[row][col]==0){
					this.data[row][col]=this.data[row][next];
					this.data[row][next]=0;
					col++;
				}else if(this.data[row][col]==this.data[row][next]){
					this.data[row][col]*=2;
					this.data[row][next]=0;
					this.score+=this.data[row][col];
				}
			}
		}
	},
	getLeftNext:function(row,col){//专门找当前位置左侧下一个
		//从col-1开始遍历之后所有元素
		for(var next=col-1;next>=0;next--){
			if(this.data[row][next]!=0){//如果找到!=0的
				return next;//返回next
			}
		}//(遍历结束)返回-1
		return -1;
	},
//上移操作
	moveUp:function(){//上移所有列
		var before=this.data.toString();
		for(var col=0;col<this.data.length;col++){
			this.moveUpInCol(col);
		}
		var after=this.data.toString();
		if(before!=after){
			this.randomNum();//随机生成一个新数
			this.isGameOver();
			this.updateView(); //更新界面
		}
	},
	moveUpInCol:function(col){//下移第col行
		for(var row=0;row<this.data.length-1;row++){
			//从r开始，找下一个不为0的位置下标next
			var next=this.getDownNext(row,col);
			//如果next==-1，说明都是0了
			if(next==-1){break;}//退出循环
			else{
				if(this.data[row][col]==0){
					this.data[row][col]=this.data[next][col];
					this.data[next][col]=0;
					row--;
				}else if(this.data[row][col]==this.data[next][col]){
					this.data[row][col]*=2;
					this.data[next][col]=0;
					this.score+=this.data[row][col];
				}
			}
		}
	},
	getDownNext:function(row,col){//专门找当前位置左侧下一个
		//从col-1开始遍历之后所有元素
		for(var next=row+1;next<this.data.length;next++){
			if(this.data[next][col]!=0){//如果找到!=0的
				return next;//返回next
			}
		}//(遍历结束)返回-1
		return -1;
	},
//下移操作
	moveDown:function(){//下移所有列
		var before=this.data.toString();
		for(var col=0;col<this.data.length;col++){
			this.moveDownInCol(col);
		}
		var after=this.data.toString();
		if(before!=after){
			this.randomNum();//随机生成一个新数
			this.isGameOver();
			this.updateView(); //更新界面
		}
	},
	moveDownInCol:function(col){//下移第col行
		for(var row=this.data.length-1;row>0;row--){
			//从r开始，找下一个不为0的位置下标next
			var next=this.getUpNext(row,col);
			//如果next==-1，说明都是0了
			if(next==-1){break;}//退出循环
			else{
				if(this.data[row][col]==0){
					this.data[row][col]=this.data[next][col];
					this.data[next][col]=0;
					row++;
				}else if(this.data[row][col]==this.data[next][col]){
					this.data[row][col]*=2;
					this.data[next][col]=0;
					this.score+=this.data[row][col];
				}
			}
		}
	},
	getUpNext:function(row,col){//专门找当前位置左侧下一个
		//从col-1开始遍历之后所有元素
		for(var next=row-1;next>=0;next--){
			if(this.data[next][col]!=0){//如果找到!=0的
				return next;//返回next
			}
		}//(遍历结束)返回-1
		return -1;
	},
//判断是否游戏结束
	isGameOver:function(){
		if(this.isFull()){
			for(var row=0;row<this.data.length;row++){
				for(var col=0;col<this.data[row].length;col++){
					if(col!=this.data[row].length-1&&this.data[row][col]==this.data[row][col+1]){
						return false;
					}else if(row!=this.data.length-1&&this.data[row][col]==this.data[row+1][col]){
						return false;
					}
				}
			}
			this.state=this.GAMEOVER;
			return true;	
		}else{					
			return false;				
		}
	},
}
//当页面加载后
window.onload=function(){
	game.start();	
	document.onkeydown=function(){
		if(game.state==game.RUNNING){
			var e=window.event||arguments[0];		
			if(e.keyCode==37){ 
				
				game.moveLeft();			//按下左移		
			}else if(e.keyCode==39){
				game.moveRight();			//按下右移
			}else if(e.keyCode==38){
				game.moveUp();				//按下上移
			}else if(e.keyCode==40){
				game.moveDown(); //按下下移
			}
		};		
	}	
}
