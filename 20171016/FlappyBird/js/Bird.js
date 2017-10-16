(function(){
  /**
   * 鸟
   * 属性：
   *    imageArr: 鸟的精灵图数组
   *    wing:     翅膀的状态，0、1、2
   *    x:        鸟的x坐标
   *    y:        鸟的y坐标
   *    width:    鸟的宽
   *    height:   鸟的高
   *    f:        内部计帧器
   *    angle:    角度
   *    state:    有限状态机（信号量）A表示下落，B表示上升；状态的维护在本类中完成
   * 方法：
   * flyHigh(): 飞的更高，当点击的时候调用这个API
   */
  window.Bird = function() {
    this.imageArr = [game.Robj['bird0'], game.Robj['bird1'], game.Robj['bird2']];
    this.wing = 0;
    this.x = game.canvas.width / 3;
    this.y = 100;
    this.width = 48;
    this.height = 48;
    this.f = 0;
    this.angle = 0;
    this.state = 'A';
  }
  /**
   * 对外的API，往上飞一下
   */
  Bird.prototype.flyHigh = function() {
    this.state = 'B';
    this.f = 0;
  }
  /**
   * 鸟的更新
   */
  Bird.prototype.update = function() {
    //结束界面有个掉落过程
    if (game.sm.sceneNumber === 2) {
      this.y += 4;
      if (this.y >= game.land.y) {
        this.y = game.land.y;
      }
      return;
    }

    //每10帧扇动一下翅膀
    if (game.frameNumber % 10 === 0) {
      this.wing = ++this.wing % 3;
    }
    if (this.state === 'A') {
      this.f++;
      //天生下落,除的数字越大，掉落越慢
      this.y += Math.pow(this.f, 2) / 80;
      // 下落旋转, 除的数字越大，转的越慢
      this.angle = this.f / 40;
    } else if (this.state === 'B') {
      //我们可以自己定义上飞的帧数25帧
      this.f++;
      //上升，上升的时候第1瞬间变化量最大，到第25帧，变化为0
      //除的数字越大，跳的高度越小
      //25是点击之后往上跳的高度
      this.y -= Math.pow((15 - this.f), 2) / 80;
      //鸟头朝向上边, 除的数字越大转的越慢
      this.angle = -(15 - this.f) / 40;
      if (this.f > 15) {
        this.state = "A";
        this.f = 0;
      }
    }

    //判定坠毁
    if (this.y > game.land.y) {
      game.sm.changeScene(2);
    }
  }
  /**
   * 渲染
   */
  Bird.prototype.render = function() {
    //当我们对画布进行旋转，缩放，平移等操作的时候其实我们是想对特定的元素进行操作，比如图片，一个矩形等，但是当你用canvas的方法来进行这些操作的时候，其实是对整个画布进行了操作，那么之后在画布上的元素都会受到影响，所以我们在操作之前调用canvas.save()来保存画布当前的状态，当操作之后取出之前保存过的状态，这样就不会对其他的元素进行影响
    game.ctx.save();
    //先translate, 把坐标原点移动到鸟的中心
    game.ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
    game.ctx.rotate(this.angle);
    game.ctx.drawImage(this.imageArr[this.wing], -this.width / 2, -this.height / 2);
    //恢复
    game.ctx.restore();
  }
})();
