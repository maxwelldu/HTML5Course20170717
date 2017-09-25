var playState = function(game){
	
	var ground,
		readyImg,
		tipImg,
		bird,
		scoreText,
		pipeGroup;
	
	var flySound, //飞翔声音
		scoreSound, //得分声音
		pipeSound, //撞击管道声音
		groundSound; //撞击地面声音	

	var speed = 180, //游戏速度
		score = 0, //当前分数
		gapHeight = 100, //上下管道之间的缺口高度
		pipeTime = 1500; //产生管道的间隔时间

	var birdGravity = 600, //鸟的重力
		birdFlyStrength = 200; //鸟向上飞的力度


	this.init = function(){//初始化
		isGameSatrt = false;
		isGameOver = false;
		isHitGround = false;
		pipePool = [];
		score = 0;
	}

	this.create = function(){
		var bg = game.add.image(0, 0, 'background');
		bg.width = game.width;
		bg.height = game.height;
		ground = game.add.tileSprite(0, game.height - 112, game.width , 112, 'ground');
		game.physics.enable(ground);
		ground.physicsType = Phaser.SPRITE;

		readyImg = game.add.image(game.world.centerX, 100, 'ready_text');
		readyImg.anchor.set(0.5, 0.5);

		tipImg = game.add.image(game.world.centerX, game.world.centerY, 'play_tip');
		tipImg.anchor.set(0.5, 0.5);

		bird = game.add.sprite(game.world.centerX-70, game.world.centerY, 'bird');
		bird.anchor.set(0.5, 0.5);
		bird.exists = false;

		game.physics.enable(bird);
		bird.body.gravity.y = birdGravity;

		flySound = game.add.sound('fly_sound');
		scoreSound = game.add.sound('score_sound');
		pipeSound = game.add.sound('hit_pipe_sound');
		groundSound = game.add.sound('hit_ground_sound');

		game.input.onDown.addOnce(start);
		game.input.onDown.add(function(){
			if(!isGameSatrt || isGameOver) return;
			bird.body.velocity.y = -birdFlyStrength;
			flySound.play();
		});
	}

	this.update = function(){
		//鸟的角度
		if(bird.body.velocity.y<0){
			bird.angle -= 1.5;
		}else if(bird.body.velocity.y>0){
			bird.angle += 1.5;
		}
		if(bird.angle<-45) bird.angle = -45;
		else if(bird.angle>45) bird.angle = 45;

		//计分
		if(pipeGroup){
			pipeGroup.forEach(function(pipe){
				if(pipe.frame===0 && !pipe.scored){ //位于上方的管道且未记过分的
					if(pipe.body.right<game.world.centerX-bird.width/2){
						pipe.scored = true;
						scoreText.text = ++score;
						scoreSound.play();
					}
				}
			});
		}

		//超出天花板
		if(!isGameOver && bird.y<0){
			pipeSound.play();
			gameOver();
			return;
		}

		//碰撞检测
		if(!isGameOver){ //管道
			game.physics.arcade.overlap(bird, pipeGroup, function(){
				pipeSound.play();
				gameOver();
			});
		}
		if(!isHitGround){ //地面
			game.physics.arcade.overlap(bird, ground, function(){
				groundSound.play();
				hitGround();
			});
		}
	}


	var isGameSatrt = false; //游戏是否已开始的标志

	function start(){
		readyImg.destroy();
		tipImg.destroy();
		bird.exists = true;
		bird.animations.add('fly');
		bird.animations.play('fly', 24, true);
		ground.autoScroll(-speed, 0);
		scoreText = game.add.text(game.world.centerX, 40, score+'', { fill:'#fff' });
		isGameSatrt = true;

		pipeGroup = game.add.group();
		game.world.bringToTop(ground);
		game.world.bringToTop(bird);
		game.world.bringToTop(scoreText);
		game.time.events.loop(pipeTime, generatePipe);
		game.time.events.start();
	}

	var pipePool = []; //管道回收池

	function generatePipe(){
		pipeGroup.forEachAlive(function(pipe){ //先回收超出边界的管道
			if(!pipe.inWorld){
				pipe.kill();
				pipePool.push(pipe);
			}
		});
		var pipes = pipePool.splice(0, 2); //从回收池里取出两个管道
		if(pipes.length<2){ //管道不够2个，则新建
			for(var i=0; i<2-pipePool.length; i++){
				pipes.push(pipeGroup.create(0, 0, 'pipe'));
			}
		}

		var gapPosY = game.rnd.between(100, game.height - (gapHeight+112+20)); //随机取一个缺口y坐标

		//上方管道
		pipes[0].frame = 0;
		game.physics.enable(pipes[0]);
		pipes[0].reset(game.width, -(320 - gapPosY));
		pipes[0].scored = false; //计分用
		pipes[0].body.velocity.x = -speed;

		//下方管道
		pipes[1].frame = 1;
		game.physics.enable(pipes[1]);
		pipes[1].reset(game.width, gapPosY+gapHeight);
		pipes[1].scored = false; //计分用
		pipes[1].body.velocity.x = -speed;
	}

	var isGameOver = false; //游戏是否已结束的标志

	function gameOver(){//游戏结束
		if(isGameOver) return;
		isGameOver = true;
		game.time.events.stop();
		pipeGroup.setAll('body.velocity.x', 0, true);
		ground.stopScroll();
	}

	var isHitGround = false; //是否已经撞到地面的标志

	function hitGround(){//撞击地面
		if(isHitGround) return;
		isHitGround = true;
		bird.body.gravity.y = 0;
		bird.body.velocity.y = 0;
		bird.animations.stop('fly');
		if(!isGameOver) gameOver();
		pipeGroup.destroy();
		scoreText.destroy();
		bird.exists = false;
		showScore();
	}


	function showScore(){//game over后显示分数
		var bestScore = localStorage.getItem('bestScore') || 0;
		if(score>bestScore){
			bestScore = score;
			localStorage.setItem('bestScore', score);
		}
		var group = game.add.group();
		group.add(game.add.image(0, 0, 'game_over'));
		var scoreboard = game.add.image(0, 60, 'score_board');
		scoreboard.addChild(game.add.text(10, 20, score+'', { fill:'#fff', fontSize:30 }));
		scoreboard.addChild(game.add.text(10, 62, bestScore+'', { fill:'#fff', fontSize:30 }));
		group.add(scoreboard);
		var btn = game.add.button(0, 190, 'start_btn', function(){
			game.state.restart();
		});
		group.add(btn);
		group.setAll('anchor.x', 0.5);
		group.setAll('x', group.width/2);
		group.x = game.world.centerX - group.width/2;
		group.y = 100;
		//console.log(group);
	}

}