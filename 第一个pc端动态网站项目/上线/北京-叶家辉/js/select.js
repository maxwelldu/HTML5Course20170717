function selectList(id){
  var oLi = document.querySelectorAll('#'+ id +'>ul>li');
  var hobby = document.querySelector("#"+id);
  var oUl = document.querySelector("#"+id+">ul");
  var oSelect = document.querySelector('.'+id+ 'Select');
  var oSpan = hobby.querySelector('span');


//      console.log(oLi[0].offsetHeight);   //这里用这种方式获取到的height是0,所以不能这样获取
  var h = oSpan.offsetHeight * oLi.length;        //先计算一下oUl的总高度

  addEvent(hobby,'mouseenter',function(){
    this.timer=setTimeout(function(){
      oUl.style.display = 'block';
      animate(oUl,{"height" : h},200,"Quad.easeOut");
    },300);
  });

  addEvent(hobby,'mouseleave',function(){
    clearTimeout(this.timer);
    animate(oUl,{"height" : 0},600,"Quad.easeOut");
  });

  for(var i = 0; i < oLi.length; i++){
    addEvent(oLi[i],'click',function() {
      oSpan.innerText = this.innerText;

      // 因为表单提交的时候提交的是value值，所以我这里给相应的select设置了我点击的那个value值
      //这里进行赋值操作,虽然是赋值,但是select会自动寻找他的option中是否有相应的值，若有则选择上这个option否则为空
      oSelect.value = this.innerText;
      //oUl.style.display = "none";
    })
  }
}
