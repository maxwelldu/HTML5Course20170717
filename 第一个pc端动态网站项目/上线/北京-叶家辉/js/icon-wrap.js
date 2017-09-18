(function () {
	var oIconLi = document.querySelectorAll('.icon-li');
  	function ani(obj){
	    timer=setInterval(function(){
	        if(parseInt(obj.style.width)<160){     //如果传入的对象的宽小于700px
	            animate(obj,{width:160},200,'Linear');
	        }else{
	            return;
	        }
	    },300);  //20ms执行一次定时器
		}
  	for (var i=0;i<oIconLi.length;i++) {
			oIconLi[i].index=i;         //循环把i的值赋值给li的index
	    var timer;
	    oIconLi[i].onmouseenter=function(){
	        for(var i=0;i<oIconLi.length;i++){
	            oIconLi[i].style.width='30px';   //当鼠标移入到某个li时，遍历循环数组，把所有li的宽都设置为30px
	        }
	        ani(oIconLi[this.index]);  //使用ani方法，把鼠标移入的li的宽值变为140px
	 
	    }
	    oIconLi[i].onmouseleave=function(){     
	        animate(oIconLi[this.index],{width:30},200,'Linear');       //鼠标移出时，把当前li的宽设置回30px
					clearInterval(timer);    
			}
  	}
})()