var game = new Phaser.Game(288, 505, Phaser.AUTO, 'game');
game.States = {}; //创建一个对象来存放要用到的state

game.States.boot = function() {//启动场景
  this.preload = function() {
    if(!game.device.desktop){//移动设备适应
			this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
			this.scale.forcePortrait = true;
			this.scale.refresh();
		}
    game.load.image('loading', 'assets/preloader.gif');
  }
  this.create = function() {
    game.state.start('preload');//加载完后调用preload场景
  }
}
game.States.preload = function() {//显示资源加载进度场景
  this.preload = function() {
    var preloadSprite = game.add.sprite(50, game.height/2, 'loading');//创建显示loading进度的sprite
    game.load.setPreloadSprite(preloadSprite);//用setPreloadSprite方法来实现动态进度条的效果

    //以下为要加载的资源
    game.load.image('background', 'assets/background.png');//背景
    game.load.image('ground', 'assets/ground.png');//地面
    game.load.image('title', 'assets/title.png');//标题
    game.load.spritesheet('medals', 'assets/medals.png', 44, 46, 2);//勋章，超过5分就显示勋章
    game.load.spritesheet('bird', 'assets/bird.png', 34, 24, 3);//鸟
    game.load.image('btn', 'assets/start-button.png');//按钮
    game.load.spritesheet('pipe', 'assets/pipes.png', 54, 320, 2);//管道
    game.load.bitmapFont('flappy_font', 'assets/fonts/flappyfont/flappyfont.png', 'assets/fonts/flappyfont/flappyfont.fnt');//显示分数的字体
    game.load.audio('fly_sound', 'assets/flap.wav');//飞翔
    game.load.audio('score_sound', 'assets/score.wav');//得分
    game.load.audio('hit_pipe_sound', 'assets/pipe-hit.wav');//撞击管道
    game.load.audio('hit_ground_sound', 'assets/ouch.wav');//撞击地面

    game.load.image('ready_text', 'assets/get-ready.png');//get ready
    game.load.image('play_tip', 'assets/instructions.png');//玩法提示
    game.load.image('game_over', 'assets/gameover.png');//gameover
    game.load.image('score_board', 'assets/scoreboard.png');//得分板
  }
  this.create = function() {
    game.state.start('menu');//当以上所有的资源加载完成后就可以进入menu游戏菜单场景了
  }
}
game.States.menu = function() {//游戏菜单场景
  this.create = function() {
    var bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');//当作背景的tileSprite
    var ground = game.add.tileSprite(0, game.height-112, game.width, 112, 'ground');//当作地面的tileSprite
    bg.autoScroll(-10, 0);//让背景动起来
    ground.autoScroll(-100, 0);//让地面动起来

    var titleGroup = game.add.group(); //创建存放标题的组
    titleGroup.create(0, 0, 'title');//通过组的create方法创建标题图片并添加到组里
    var bird = titleGroup.create(190, 10, 'bird'); //创建bird对象并添加到组里
    bird.animations.add('fly');//添加动画
    bird.animations.play('fly', 12, true);//播放动画
    titleGroup.x = 35;//调整组的水平位置
    titleGroup.y = 100; //调整组的垂直位置
    game.add.tween(titleGroup).to({ y: 120 }, 1000, null, true, 0, Number.MAX_VALUE, true);//对这个组添加一个tween动画，让它不停的上下移动

    var btn = game.add.button(game.width/2, game.height/2, 'btn', function() {//添加一个按钮
      game.state.start('play');//点击按钮时跳转到play场景
    });
    btn.anchor.setTo(0.5, 0.5);//设置按钮的中心点
  }
}
game.States.play = function() {//游戏部分
  this.create = function() {
    this.bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');//背景图，这里先不用移动，游戏开始后再动
    this.pipeGroup = game.add.group();//用于存放管道的组
    this.pipeGroup.enableBody = true;
    this.ground = game.add.tileSprite(0, game.height-112, game.width, 112, 'ground');//地板，这里先不用移动，游戏开始后再动
    this.bird = game.add.sprite(50, 150, 'bird');//鸟
    this.bird.animations.add('fly');//添加动画
    this.bird.animations.play('fly', 12, true);//播放动画
    this.bird.anchor.setTo(0.5, 0.5);//设置中心点
    game.physics.enable(this.bird, Phaser.Physics.ARCADE);//开启鸟的物理系统
    this.bird.body.gravity.y = 0; //鸟的重力，未开始游戏，先让重力为0，不然鸟会掉下来
    game.physics.enable(this.ground, Phaser.Physics.ARCADE);//开启地面的物理系统
    this.ground.body.immovable = true;//让地面在物理环境中固定不动

    this.soundFly = game.add.sound('fly_sound');
    this.soundScore = game.add.sound('score_sound');
    this.soundHitPipe = game.add.sound('hit_pipe_sound');
    this.soundHitGround = game.add.sound('hit_ground_sound');
    this.scoreText = game.add.bitmapText(game.world.centerX-20, 30, 'flappy_font', '0', 36);

    this.readyText = game.add.image(game.width/2, 40, 'ready_text');//get ready
    this.playTip = game.add.image(game.width/2, 300, 'play_tip');//提示点击屏幕
    this.readyText.anchor.setTo(0.5, 0);
    this.playTip.anchor.setTo(0.5, 0);

    this.hasStarted = false;//游戏是否已开始
    game.time.events.loop(900, this.generatePipes, this);//利用时钟系统来循环产生管道
    game.time.events.stop(false);//先不要启动时钟
    game.input.onDown.addOnce(this.startGame, this);//点击屏幕正式开始游戏
  }
  this.startGame = function() {
    this.gameSpeed = 200;//游戏速度
    this.gameIsOver = false;//游戏是否已经结束的标志
    this.hasHitGround = false;//是否已碰撞到地面的标志
    this.hasStarted = true;//游戏是否已经开始的标志
    this.score = 0; //初始得分
    this.bg.autoScroll(-(this.gameSpeed/10), 0)//让背景开始移动
    this.ground.autoScroll(-this.gameSpeed, 0);//让地面开始移动
    this.bird.body.gravity.y = 1150; //给鸟设一个重力
    this.readyText.destroy(); //去除'get ready'
    this.playTip.destroy();//去除'玩法提示'
    this.input.onDown.add(this.fly, this);//给鼠标按下事件绑定鸟的飞翔动作
    game.time.events.start();//启动时钟事件，开始制造管道
  }
  this.stopGame = function() {
    this.bg.stopScroll();
    this.ground.stopScroll();
    this.pipeGroup.forEachExists(function(pipe) {
      pipe.body.velocity.x = 0;
    }, this);
    this.bird.animations.stop('fly', 0);
    game.input.onDown.remove(this.fly, this);
    game.time.events.stop(true);
  }
  this.fly = function() {
    this.bird.body.velocity.y = -350;//飞翔，实质上就是给鸟设一个向上的速度
    game.add.tween(this.bird).to({ angle: -30 }, 100, null, true, 0, 0, false);//上升时头朝上的动画
    this.soundFly.play();//播放飞翔的音效
  }
  this.hitPipe = function() {
    if (this.gameIsOver) return;
    this.soundHitPipe.play();
    this.gameOver();
  }
  this.hitGround = function() {
    if(this.hasHitGround) return;//已经撞击过地面
    this.hasHitGround = true;
    this.soundHitGround.play();
    this.gameOver(true);
  }
  this.gameOver = function(show_text) {
    this.gameIsOver = true;
    this.stopGame();
    if (show_text) this.showGameOverText();
  }
  this.showGameOverText = function() {
    this.scoreText.destroy();
    game.bestScore = game.bestScore || 0;
    if (this.score > game.bestScore) game.bestScore = this.score;//最好的分数
    this.gameOverGroup = game.add.group();//添加一个组
    var gameOverText = this.gameOverGroup.create(game.width/2, 0, 'game_over');//game over文字图片
    var scoreboard = this.gameOverGroup.create(game.width/2, 70, 'score_board');//分数板
    var medals = this.gameOverGroup.create(game.width/2-85, 113, 'medals', this.score >= 3 ? 1 : 0);//勋章
    var currentScoreText = game.add.bitmapText(game.width/2 + 60, 105, 'flappy_font', this.score+'', 20, this.gameOverGroup);//当前分数
    var bestScoreText = game.add.bitmapText(game.width/2 + 60, 153, 'flappy_font', game.bestScore+'', 20, this.gameOverGroup);//最好分数
    var replyBtn = game.add.button(game.width/2, 210, 'btn', function() {//重玩按钮
      game.state.start('play');
    }, this, null, null, null, null, this.gameOverGroup);
    gameOverText.anchor.set(0.5, 0);
    scoreboard.anchor.set(0.5, 0);
    replyBtn.anchor.set(0.5, 0);
    this.gameOverGroup.y = 30;
  }
  this.generatePipes = function(gap) {//制造一组上下的管道
    gap = gap || 100;//上下管道之间的间隙宽度
    var position = (505 - 320 - gap) + Math.floor((505 - 112 - 30 - gap - 505 + 320 + gap) * Math.random());//计算出一个上下管道之间的间隙的随机位置
    var topPipeY = position - 360;//上方管道的位置
    var bottomPipeY = position + gap; //下方管道的位置

    if (this.resetPipe(topPipeY, bottomPipeY)) return;//如果有出了边界的管道，则重置他们，不再制造新的管道了，达到循环利用的目的

    var topPipe = game.add.sprite(game.width, topPipeY, 'pipe', 0, this.pipeGroup);//上方的管道
    var bottomPipe = game.add.sprite(game.width, bottomPipeY, 'pipe', 1, this.pipeGroup);//下方的管道
    this.pipeGroup.setAll('checkWorldBounds', true);//边界检测
    this.pipeGroup.setAll('outOfBoundsKill', true);//出边界后自动kill
    this.pipeGroup.setAll('body.velocity.x', -this.gameSpeed);//设置管道运动的速度
  }
  this.resetPipe = function(topPipeY, bottomPipeY) {//重置出了边界的管道，做到回收利用
    var i = 0;
    this.pipeGroup.forEachDead(function(pipe) {//对组调用forEachDead方法来获取那些已经出了边界，也就是"死亡"了的对象
      if (pipe.y <= 0) {//是上方的管道
        pipe.reset(game.width, topPipeY);//重置到初始位置
        pipe.hasScored = false;//重置为未得分
      } else {//下方的管道
        pipe.reset(game.width, bottomPipeY);//重置到初始位置
      }
      pipe.body.velocity.x = -this.gameSpeed;//设置管道速度
      i++;
    }, this);
    return i == 2;//如果 i == 2 代码有一组管道已经出了边界，可以回收这组管道了
  }
  this.checkScore = function(pipe) {//负责分数的检测和更新，pipe表示待检测的管道
    //pipe.hasScored属性用来标识该管道是否已经得过分
    //pipe.y<0 是指一组管道中的上面那个管道，一组管道中我们只需要检测一个就行
    //当管道的x坐标，加上管道的宽度小于鸟的x坐标的时候，就表示已经飞过了管道，可以得分了
    if (!pipe.hasScored && pipe.y<=0 && pipe.x<=this.bird.x-17-54) {
      pipe.hasScored = true;//标识为已经得过分
      this.scoreText.text = ++this.score;//更新分数的显示
      this.soundScore = game.add.sound('score_sound');//得到一个sound对象
      this.soundScore.play();//得分的音效
      return true;
    }
    return false;
  }
  this.update = function() {//每一帧中都要执行的代码可以写在update方法中
    if (!this.hasStarted) return;//游戏未开始，先不执行任何东西
    game.physics.arcade.collide(this.bird, this.ground, this.hitGround, null, this);//检测与地面的碰撞
    game.physics.arcade.overlap(this.bird, this.pipeGroup, this.hitPipe, null, this);//检测与管道的碰撞
    if (this.bird.angle < 90) this.bird.angle += 2.5;//下降时鸟的头朝下的动画
    this.pipeGroup.forEachExists(this.checkScore, this);//分数检测和更新
  }
}
//把定义好的场景添加到游戏中
game.state.add('boot', game.States.boot);
game.state.add('preload', game.States.preload);
game.state.add('menu', game.States.menu);
game.state.add('play', game.States.play);

//调用boot场景来启动游戏
game.state.start('boot');
