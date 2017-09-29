 var mySwiper = new Swiper ('.swiper-container', {
  	initialSlide :0,			//设置初始化时 slide的索引
    direction: 'horizontal',	//设置slide的滑动方向，vertical表示垂直，horizontal表示水平
    speed:300,					//设置slide滑动开始到结束的时间（单位ms），也是触摸滑动时释放至贴合的时间
    autoplay:3000,				//设置slide自动滑动的时间间隔
    //grabCursor:true,			//true时，覆盖时鼠标变成手掌的样子，拖动时鼠标变成抓手形状
    
    loop: true,
    // 如果需要分页器
    pagination: '.swiper-pagination',
    
 	onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
    	swiperAnimateCache(swiper); //隐藏动画元素 
    	swiperAnimate(swiper); //初始化完成开始动画
  	}, 
  	onSlideChangeEnd: function(swiper){ 
    	swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
  	},
  	
  })     