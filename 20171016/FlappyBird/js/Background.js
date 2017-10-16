(function(){
  /**
   * 背景类
   * 属性：
   *      image:  图片对象
   *      x:      x坐标
   * 方法：
   *      update(): 更新坐标
   *      render(): 渲染到界面
   */
  window.Background = function() {
    //用到全局对象中的game, 这叫中介者模式，要给所有的人用
    this.image = game.Robj['background'];
    this.x = 0;
  }
  Background.prototype.update = function() {
    //无缝滚动实现,第一张显示完成马上拉回去
    this.x--;
    if (this.x < -game.canvas.width) {
      this.x = 0;
    }
  }
  Background.prototype.render = function() {
    //相当于拷贝一张图片放到后面
    game.ctx.drawImage(this.image, this.x, 0, game.canvas.width, game.canvas.height);
    game.ctx.drawImage(this.image, game.canvas.width + this.x, 0, game.canvas.width, game.canvas.height);
  }
})();
