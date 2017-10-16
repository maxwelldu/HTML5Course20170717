(function(){
  /**
   * 大地
   * 属性：
   *     image: 图片对象
   *     x:     x坐标
   *     y:     y坐标
   */
  window.Land = function() {
    this.image = game.Robj['land'];
    this.x = 0;
    this.y = game.canvas.height - 112;
  }
  Land.prototype.update = function() {
    this.x-=3;
    if (this.x < -game.canvas.width) {
      this.x = 0;
    }
  }
  Land.prototype.render = function() {
    //渲染图片, 无缝连续滚动，所以克隆一张，一起移动。
    game.ctx.drawImage(this.image, this.x, this.y);
    game.ctx.drawImage(this.image, game.canvas.width + this.x, game.canvas.height - 112);
  }
})();
