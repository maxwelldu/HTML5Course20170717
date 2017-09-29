var oLis=$('#header-cavns li');
var index=0;
var times=setInterval(function () {
  index++;
  index=index===6?0:index;
  $(oLis[index]).addClass('idx').siblings().removeClass('idx');
},3000);
