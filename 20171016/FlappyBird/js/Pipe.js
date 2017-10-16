(function(){
  /**
   * 管道
   * 属性：
   *     imageUp: 上管道
   *     imageDown: 下管道
   *     kaikou: 可通过的区间大小
   *     heightUp: 上管道的高度
   *     heightDown: 下管道的高度
   *     x: x坐标
   *     alreadyPass: 标志是否安全通过
   */
  window.Pipe = function() {
    //用到全局对象中的game, 这叫中介者模式，要给所有的人用
    this.imageUp = game.Robj['pipe_up'];
    this.imageDown = game.Robj['pipe_down'];
    //总高度512
    this.kaikou = 120;
    this.heightUp = _.random(50, game.land.y - this.kaikou - 50);
    this.heightDown = game.land.y - this.kaikou - this.heightUp;
    this.x = 300;
    this.alreadyPass = false;
  }
  Pipe.prototype.update = function() {
    this.x--;
    //如果自己出屏幕了，自杀
    if (this.x < -52) {
      game.sm.pipes = _.without(game.sm.pipes, this);
    }
    //碰撞检测，4个数字就能验证是否小鸟撞到了上管子
    if ((this.x < game.bird.x + 7 + 28) && (this.heightUp > game.bird.y + 7) && (this.x > game.bird.x - 42) ) {
      game.sm.changeScene(2);
    } else if((this.x < game.bird.x + 7 + 28) && (game.land.y - this.heightDown < game.bird.y + 7 + 28) && (this.x > game.bird.x - 42)) {
      game.sm.changeScene(2);
    }
    //加分检测
    if (!this.alreadyPass && this.x + 52 < game.bird.x + 48) {
      this.alreadyPass = true;
      game.score++;
    }
  }
  Pipe.prototype.render = function() {
    game.ctx.drawImage(this.imageDown, 0, 320 - this.heightUp, 52, this.heightUp, this.x, 0, 52, this.heightUp);
    game.ctx.drawImage(this.imageUp, 0, 0, 52, this.heightDown, this.x, game.land.y - this.heightDown, 52, this.heightDown);
  }
})();
