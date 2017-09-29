window.onload = function() {
    var mySwiper = new Swiper('.swiper-container', {
        // 轮播图的方向，也可以是vertical方向
        direction: 'horizontal',

        //播放速度
        loop: true,

        // 自动播放时间
        autoplay: 1000,

        // 播放的速度
        speed: 2000,

        // 如果需要分页器，即下面的小圆点
        pagination: '.swiper-pagination',

        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        　　　　　

        　　　　　　 // 这样，即使我们滑动之后， 定时器也不会被清除
        　　　　autoplayDisableOnInteraction: false,

        // 如果需要滚动条
        scrollbar: '.swiper-scrollbar',
    });
}