var menuState = function(game){
	this.create = function(){
		var bg = game.add.image(0, 0, 'background');
		bg.width = game.width;
		bg.height = game.height;

		var group = game.add.group();
		var title = game.add.image(0, 0, 'title');
		var bird = game.add.sprite(200, 10, 'bird');
		bird.animations.add('fly');
		bird.animations.play('fly', 24, true);
		group.add(title);
		group.add(bird);
		group.position.x = game.world.centerX - group.width/2;
		group.position.y = 80;

		var tween = game.add.tween(group);
		tween.to({
			y:50
		}, 800, 'Linear', true, 0, -1 ,true);
		
		var btn = game.add.button(game.world.centerX, game.world.centerY, 'start_btn', function(){
			game.state.start('play');
		});
		btn.anchor.set(0.5, 0.5);

		var ground = game.add.tileSprite(0, game.height - 112, game.width , 112, 'ground');

		/*game.add.tileSprite(0,0,game.width,game.height,'background').autoScroll(-10,0); //背景图
		game.add.tileSprite(0,game.height-112,game.width,112,'ground').autoScroll(-100,0); //地板
		var titleGroup = game.add.group(); //创建存放标题的组
		titleGroup.create(0,0,'title'); //标题
		var bird = titleGroup.create(190, 10, 'bird'); //添加bird到组里
		bird.animations.add('fly'); //添加动画
		bird.animations.play('fly',12,true); //播放动画
		titleGroup.x = 35;
		titleGroup.y = 100;
		game.add.tween(titleGroup).to({ y:120 },1000,null,true,0,Number.MAX_VALUE,true); //标题的缓动动画
		var btn = game.add.button(game.width/2,game.height/2,'btn',function(){//开始按钮
			game.state.start('play');
		});
		btn.anchor.setTo(0.5,0.5);*/
	}
}