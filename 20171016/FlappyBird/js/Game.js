(function(){
  //游戏类, 中央处理类, 这一套就有点像一个小的游戏引擎，但是真正的游戏引擎比这个复杂的多，还有场景管理，白鹭引擎，phaser
  //这个类负责游戏的资源读取，主循环，维护一个所有演员清单
  /**
   * 游戏类
   * 属性：
   *     canvas:      canvas元素
   *     ctx:         canvas上下文对象
   *     frameNumber: 帧编号
   *     R:           资源列表
   *     Ramount:     资源个数
   *     Robj:        资源对象，和R对象有相同的key,是类似对象
   *     score:       分数
   *     sm:          场景管理对象
   *     bird:        鸟对象
   *     background:  背景对象
   *     land:        大地对象
   *  方法：
   *    loadResource(): 加载资源
   *    start():        开始游戏
   *    mainloop():     主循环
   */
  window.Game = function() {
    this.canvas = document.querySelector('canvas');
    this.canvas.width = document.documentElement.clientWidth > 320 ? 288 : document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientWidth > 320 ? 512 : document.documentElement.clientHeight;
    this.ctx = this.canvas.getContext('2d');

    this.frameNumber = 0;
    this.R = {
      "background": "images/bg_day.png",
      "bird0": "images/bird0_0.png",
      "bird1": "images/bird0_1.png",
      "bird2": "images/bird0_2.png",
      "land": "images/land.png",
      "pipe_up": "images/pipe_up.png",
      "pipe_down": "images/pipe_down.png",
      "number0": "images/font_048.png",
      "number1": "images/font_049.png",
      "number2": "images/font_050.png",
      "number3": "images/font_051.png",
      "number4": "images/font_052.png",
      "number5": "images/font_053.png",
      "number6": "images/font_054.png",
      "number7": "images/font_055.png",
      "number8": "images/font_056.png",
      "number9": "images/font_057.png",
      "title": "images/title.png",
      "tutorial": "images/tutorial.png",
      "button_play": "images/button_play.png",
      "game_over": "images/text_game_over.png",
    }
    this.Ramount = _.keys(this.R).length;
    this.Robj = {};
    this.score = 0;
    //加载图片， 这个函数是异步语句, 里面有onload, 里面的函数就是回调函数，表示事情完成之后做的事情
    //nodejs当中全部是这种异步语句：db.insert({"a":1, "b":2}, "student", function(){
    //})
    //这种不好用，一般自己给封装一个函数
    /*
    人为的构建回调函数
    function insert(data, callback) {
      db.insert(data, 'student', callback);
    }
    insert({"a":1, "b":2}, function(){

    })
    */

    this.loadResource(() => {
      // game.ctx.drawImage必须需要图片已经加载好了才能开始
      this.start();
    });
  }
  /**
   * 加载资源
   * @param  {Function} callback 回调函数，当资源加载完成时
   */
  Game.prototype.loadResource = function(callback) {
    //加载好的图片个数
    var already = 0;
    //请求我的资源列表中的所有文件
    for (var k in this.R) {
      this.Robj[k] = new Image();
      this.Robj[k].src = this.R[k];
      this.Robj[k].onload = () => {
        already++;
        this.ctx.clearRect(0, 0, this.canvas.width, self.canvas.height);
        this.ctx.font = "20px 微软雅黑";
        this.ctx.fillStyle = "white";
        this.ctx.fillText("正在加载图片" + already + '/' + this.Ramount, this.canvas.width/2-80, this.canvas.height/2-20);

        //如果所有的图片都加载完毕了
        if (already === this.Ramount) {
          callback && callback();
        }
      }
    }
  }
  /**
   * 开始游戏
   */
  Game.prototype.start = function() {
    //游戏开始的时候，完成演员的注册。
    this.bird = new Bird();
    this.background = new Background();
    this.land = new Land();
    //场景管理器
    this.sm = new SceneManagement();
    this.sm.changeScene(0);
    //设置主循环, 这是游戏的唯一定时器！
    setInterval(() => {
      this.mainloop();
    }, 20);
  }
  /**
   * 主循环
   */
  Game.prototype.mainloop = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //命令场景管理器都渲染
    this.sm.render();

    this.frameNumber++;
    this.ctx.font = "14px consolas";
    this.ctx.fillStyle = "white";
    this.ctx.fillText('FNO:' + this.frameNumber, 0, 10);
    this.ctx.fillText("场景编号：" + this.sm.sceneNumber, 0, 30);
  }
})();
