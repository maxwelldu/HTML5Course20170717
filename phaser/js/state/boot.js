var bootState = function(game){
	
	this.init = function(){
		if(!game.device.desktop){//移动设备适应
			game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		}
   		game.scale.pageAlignHorizontally = true;
	}

	this.preload = function(){
		game.load.image('loading','assets/loading.gif');
	};
	
	this.create = function(){
		game.state.start('loader'); //启动资源加载场景
	};
}