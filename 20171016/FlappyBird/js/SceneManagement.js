(function() {
  /**
   * 场景管理器
   * 提供一个切换场景的API changeScene
   * 提供一个渲染不同场景的API render
   * 属性：
   *     sceneNumber: 场景编号
   *     f: 当前场景的计帧器，计算当前场景播放到第几帧
   *     pipes: 管子数组
   */
  window.SceneManagement = function() {
    this.sceneNumber = 0;
    this.f = 0;
    this.pipes = [];
    this.handleTap = (event) => {
      var mousex = event.offsetX;
      var mousey = event.offsetY;
      if (mousex > game.canvas.width/2-58 && mousex < game.canvas.width / 2 + 58 && mousey > 340 && mousey < 410) {
        // this.btnhover = true;
        this.changeScene(1);
      } else {
        // this.btnhover = false;
      }
    }
    this.handleTap1 = () => {
      game.bird.flyHigh();
    }
    this.handleTap2 = () => {
      this.changeScene(0);
    }
  }
  /**
   * 切换场景
   * 做一些显示元素的位置恢复，场景编号切换，绑定事件
   * @param  {integer}  n [场景编号]
   */
  SceneManagement.prototype.changeScene = function(n) {
    this.f = 0;
    this.sceneNumber = n;
    game.canvas.removeEventListener('touchstart', this.handleTap);
    game.canvas.removeEventListener('touchstart', this.handleTap1);
    game.canvas.removeEventListener('touchstart', this.handleTap2);
    //更换场景的这一瞬间做的事情：
    if (this.sceneNumber === 0) {
      game.score = 0;
      //让title和tutorial就位
      game.ctx.drawImage(game.Robj['title'], game.canvas.width/2-89, 0);
      game.ctx.drawImage(game.Robj['tutorial'], game.canvas.width/2-57, 110);

      //按钮触碰, 模拟，这一块儿不需要
      // this.btnhover = false;
      //添加场景0的监听,canvas不能给元素添加事件，只能给canvas,通过位置来判断； 不能加一个DOM的按钮过去
      game.canvas.onmousedown = this.handleTap;
      game.canvas.addEventListener('touchstart', this.handleTap, {passive: true});
    } else if (this.sceneNumber === 1) {
      //鸟复位
      game.bird = new Bird();
      //清空管子
      this.pipes = [];
      game.canvas.onmousedown = this.handleTap1;
      game.canvas.addEventListener('touchstart', this.handleTap1, {passive: true});
    } else if (this.sceneNumber === 2) {
      game.canvas.onmousedown = this.handleTap2;
      game.canvas.addEventListener('touchstart', this.handleTap2, {passive: true});
    }
  }
  /**
   * 负责渲染不同场景的不同显示对象
   */
  SceneManagement.prototype.render = function() {
    this.f++;

    //每个场景要做的事情
    if (this.sceneNumber === 0) {
      game.background.render();

      //用帧编号来控制动画
      //title的动画，20帧下落，20帧之后停住
      if (this.f < 20) {
        game.ctx.drawImage(game.Robj["title"], game.canvas.width/2-89, this.f * 6);
      } else {
        game.ctx.drawImage(game.Robj["title"], game.canvas.width/2-89, 120);
      }
      //没有回调函数，用帧来控制
      //游戏说明动画，闪烁动画，从20帧之后出现
      if (this.f > 20) {
        game.ctx.save();
        game.ctx.globalAlpha = this.f % 10 / 10;
        game.ctx.drawImage(game.Robj["tutorial"], game.canvas.width/2-57, 210);
        game.ctx.restore();

        //hover效果通过绑定onmouseover事件，然后在这个时候绘制一张图片，通过精灵图绘制
        // game.ctx.drawImage(game.Robj['button_play'], 0, -70, 116, 70, game.canvas.width/2-58, 340, 116, 70);
        //按钮也是这时候出现
        // if (this.btnhover) {
          // game.ctx.drawImage(game.Robj['button_play'], 0, -70, 116, 70, game.canvas.width/2-58, 340, 116, 70);
        // } else {
          game.ctx.drawImage(game.Robj['button_play'], 0, 0, 116, 70, game.canvas.width/2-58, 340, 116, 70);
        // }
      }
    } else if (this.sceneNumber === 1) {
      //渲染背景
      game.background.update();
      game.background.render();
      //渲染大地
      game.land.update();
      game.land.render();
      //每20帧就创建新管子
      if (game.frameNumber % 100 === 0) {
        this.pipes.push(new Pipe());
      }
      //每帧渲染管子
      _.each(this.pipes, function(pipe){
        pipe.update();
        pipe.render();
      });
      //渲染鸟
      game.bird.update();
      game.bird.render();
      //打印分数
      var weishu = game.score.toString().length;
      for (var i = 0; i < weishu; i++) {
        var zheyiwei = game.score.toString().charAt(i);
        game.ctx.drawImage(game.Robj['number' + zheyiwei], game.canvas.width/2 - 12 * weishu + i * 24, 0);
      }
    } else if(this.sceneNumber === 2) {
      //渲染背景
      game.background.render();
      //渲染大地
      game.land.render();
      //每帧渲染管子
      _.each(this.pipes, function(pipe){
        pipe.render();
      });
      //渲染鸟
      game.bird.update();
      game.bird.render();
      //进行其他动画
      game.ctx.drawImage(game.Robj['game_over'], game.canvas.width/2 - 102, 60);
      //显示文字
      game.ctx.fillText('分数：' + game.score, 100, 250);
      game.ctx.fillText('点任何地方继续', 100, 300);
    }
  }
})();
