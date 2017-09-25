var loaderState = function(game){

    var progressText;
    
    this.init = function(){
        var sprite = game.add.image(game.world.centerX, game.world.centerY, 'loading');
        sprite.anchor = { x:0.5, y:0.5 };
        progressText = game.add.text(game.world.centerX, game.world.centerY + 30,'0%', { fill:'#fff', fontSize:'16px' });
        progressText.anchor = { x:0.5, y:0.5 };
    }
	
    this.preload = function(){
		//var preloadSprite = game.add.sprite(35,game.height/2,'loading'); //创建显示loading进度的sprite
		//game.load.setPreloadSprite(preloadSprite);
        //以下为要加载的资源
        game.load.image('background','assets/background.png'); //背景
    	game.load.image('ground','assets/ground.png'); //地面
    	game.load.image('title','assets/title.png'); //游戏标题
    	game.load.spritesheet('bird','assets/bird.png',34,24,3); //鸟
    	game.load.image('start_btn','assets/start-button.png');  //按钮
    	game.load.spritesheet('pipe','assets/pipes.png',54,320,2); //管道
    	game.load.bitmapFont('flappy_font', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');
    	game.load.audio('fly_sound', 'assets/flap.mp3');//飞翔的音效
    	game.load.audio('score_sound', 'assets/score.mp3');//得分的音效
    	game.load.audio('hit_pipe_sound', 'assets/pipe-hit.mp3'); //撞击管道的音效
    	game.load.audio('hit_ground_sound', 'assets/ouch.mp3'); //撞击地面的音效

    	game.load.image('ready_text','assets/get-ready.png');
    	game.load.image('play_tip','assets/instructions.png');
    	game.load.image('game_over','assets/gameover.png');
    	game.load.image('score_board','assets/scoreboard.png?v2');

        game.load.onFileComplete.add(function(progress){
            progressText.text = progress + '%';
        });
	}
	
    this.create = function(){
		game.state.start('menu');
	}
}