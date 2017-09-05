//window.onload = function() {

  //整体的游戏对象
  function Game() {
    this.score = 0;
    this.miss = 0;
    this.speed = 1;
    this.timer = null;        // 控制气球产生的的定时器
    this.time = 1000;         // 控制产生气球的时间间隔
    this.init();
  }

   // 小球对象
  function Ball(game) {
    this.game = game;          //利用这个game将小球和当前场游戏联系起来
    this.top = 600;
    this.left = Math.random() * 1000 + 200;
    this.score = parseInt(Math.random() * 11 + 1);
    this.dom = null;
    this.timer = null;        //气球向上走的时候的定时器
    this.speed = 1;           //控制气球速度
    this.init();
  }

  Game.prototype = {

    //初始化
    init : function() {
      this.createBall();
      this.addScore();
      this.changeSpeed();
    },

    //每隔多少秒自动产生一个气球的方法
    createBall : function() {
      var that = this;
      this.timer = setInterval(function() {
        new Ball(that);
      }, that.time);
    },

    //添加分数,并更新页面中分数的方法
    addScore : function() {
      var score = document.querySelector('#score').querySelector('i');
      score.innerText = this.score;
    },

    //改变速度的方法,这里的改变速度其实就是将产生小球的时间间隔减小
    changeSpeed : function() {
      var beforeSpeed = this.speed;
      var speed = document.querySelector('#speed').querySelector('i');
      this.speed= parseInt(this.score / 100) + 1;              // 加一是为了显示当前是第一级

      speed.innerText = this.speed;
      this.time = 1000 - parseInt(this.score / 100) * 100;           // 这里减一是为了保证初始的时间间隔为1000

      //这里给this.time设定一个最小值
      this.time = this.time <= 100 ? this.time = 100 : this.time;

      //因为在这里改变this.time后由于定时器还是原来的定时器,所以其实时间间隔是不会变的,
      //解决方法就是先将原来的speed先存储起来，然后，与改变后的进行比较 若不相同那么就重新执行一次
      //createBall,并清除之前的定时器
      if(this.speed !== beforeSpeed) {
        clearInterval(this.timer);
        console.log(this.time);
        this.createBall();
      }
    },

    //统计未点中的气球的方法
    missBall : function() {
      var miss = document.querySelector('#miss').querySelector('i');
      miss.innerText = this.miss;
    },

    //开始方法
    //结束方法
    end : function() {
      if(this.miss >= 10) {
        clearInterval(this.timer);
        alert("游戏结束");
        window.location.reload();     //游戏结束重新加载一次页面
      } else if( this.speed >= 20) {
        clearInterval(this.time);
        alert("已通关游戏")
        window.location.reload();     //游戏通关重新加载一次页面
      }
    }
  };

  Ball.prototype = {
    //初始化
    init : function() {
      this.bindDom();
      this.fly();
      this.bindEvent();
    },
    //绑定dom元素
    bindDom : function() {
      this.dom = document.createElement('div');
      this.dom.classList.add('ballon');
      this.dom.style.left = this.left + "px";
      this.dom.style.top = this.top + "px";

      //控制要显示的是哪一张图
      this.dom.style.backgroundPositionX = - ((this.score - 1) % 4) * 96 + "px";
      this.dom.style.backgroundPositionY = - parseInt((this.score - 1) / 4) * 122 + "px";
      document.body.appendChild(this.dom);
    },

    //控制气球向上走
    fly : function() {
      var that = this;          //将当前对象存储一份
      that.timer = setInterval(function() {

        // 当this.score的分数是10或者是 11时 则自己设定一个速度
        if(this.score === 10 || this.score === 11) {
          this.speed = 6;
        }
        this.speed = that.score * that.speed ;
        that.top -= this.speed;

        // 如果气球距上部10px的话,并且当前这个气球是有分数的那么就要执行下面步骤
        // 这里只有是1~8的气球没点到才算作miss
        if(that.top <= 10 && that.score <=8 ){
          that.destroy();
          this.game.miss ++;
          console.log(this.game.miss);
          this.game.missBall();
          this.game.end();            //每次为未点中一个气球的话就判断游戏是否结束
        }

        //如果上一步未执行的话说明当前气球应该是* / 变0,那么就执行下面步骤
        if(that.top <= 10){
          that.destroy();
        }
        that.dom.style.top = that.top + "px";
      },30);
    },

    //给气球绑定click方法
    bindEvent : function() {
      var that = this;
      this.dom.addEventListener('click',function() {

        if(that.score === 9){
          that.game.score *= 2;
        } else if(that.score === 10) {
          that.game.score /= 2;
        } else if(that.score === 11) {
          that.game.score = 0;
        }else {
          // 先改变分数
          that.game.score += that.score;
        }

        that.game.addScore();
        that.game.changeSpeed();
        // 控制当game.speed大于5时和8时,难度提升加大
        if(that.game.speed >=5 || that.game.speed >=8 ){
          that.speed ++;
        }
        // 执行气球爆炸方法
        that.destroy();
      },false);
    },

    //气球爆炸
    destroy : function() {
      if(this.dom){
        this.dom.parentNode.removeChild(this.dom);
      }
      clearInterval(this.timer);
    }

  };

  var game = new Game();
//};