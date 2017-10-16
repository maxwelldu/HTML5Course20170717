Canvas知识储备：
this.canvas = document.querySelector('canvas');
this.ctx = this.canvas.getContext('2d');

https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/clearRect
clearRect();
https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/globalAlpha
globalAlpha;
https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/font
font;
https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/fillText
fillText();
https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
drawImage();
https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/translate
translate();
https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/rotate
rotate();
https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/save
save();
https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/restore
restore();

游戏开发需要知道的概念：
game游戏对象
资源加载对象
场景管理对象
显示对象


不管页面上有多少的演员，只有一个定时器，这个定时器的业务超级简单：
setInterval(function(){
  让所有演员更新
  让所有演员渲染
}, 20);

所以：
1）所有的演员，都必须提供update、render方法，这实际上叫做面向接口编程。Java中，类是一个抽象的概念，比"类"还抽象一层的东西叫做"接口"，就是制定必须有哪些方法的特殊类。所有的类，都必须实现这两个方法。JS中没有接口这个概念，但是我们可以用Java类比，要求所有的演员都必须有update、render方法，提供相应的实现。
2）Game类必须维护一个演员清单，所有的演员在new出来的时候，必须注册。所谓的注册，就是把自己加入到Game类的演员清单中。
this.users = [];

game.users.push(this);

中介者模式：一个对象处于中央控制管理地位，其他的所有对象，都是自己的改改。
我们的演员有什么：背景、大地、管子、鸟、比分、按钮……全是game的改改。这样做的好处是什么：
1）全局作用域干净，只有一个game对象。鸟在哪儿？game.bird 大地在哪儿？game.land
2）相互通信简单，比如鸟要得到管子的位置，so easy。通过game类中转即可。game.pipes。
3）Game类可以一统每个演员new的时间点：game就能控制当图片读取完毕之后，new出来大地。当帧数%100===0的时候，new管子。

物理的下落模型，我们的动画间隔时间是一致的，但是：
1）物体的变化增量，每帧比每帧大，大2次关系
2）物体的位置与帧数成2次关系
高中时候的打点计时器实验，告诉你东西会越落越快，因为重力加速度，加速度是恒定的

有限状态机：和信号量类似，但是自治, bird类自己管理，game类并不负责
Finite-state machine, FSM

碰撞检测，可以是像素极检测
摩根定律
非(P 且 Q) = (非 P) 或 (非 Q)
非(P 或 Q) = (非 P) 且 (非 Q)


加分，需要函数截流，给管子一个标志位，是否已经计过分了 FLAG 打标记

游戏的核心业务已经完成：管子的生成、鸟的运动、碰撞检测、分数显示……

我们把所有的演员都注册到了game里，就是所有的演员都是game类的属性。实际上，这样做不好。
应该引入场景管理器，sceneManagement

Game
sceneManagement
有一个场景列表数组，比如场景0、场景1、场景2.所有的演员，是注册的场景里面的。比如开始按钮注册在0号场景里面，鸟、管子、大地注册在1号场景里面。Gameover字样注册在2号场景里面

Game里面只负责一件事，调用SceneMangement的update和render
而SceneManagement让当前场景的演员update和render

场景来自于
