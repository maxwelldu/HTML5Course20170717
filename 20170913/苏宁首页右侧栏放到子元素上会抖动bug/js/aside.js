var oBox = document.getElementsByClassName("box")
	oBox[0].addEventListener("mouseenter",
		function(){
			
			animate(oBox[1],{"left":-100},3000);
		},false)
	oBox[2].onmouseover = function(){
		animate(oBox[3],{"left":-45},500)
	}
//	oBox[4].onmouseover = function(){
//		animate(oBox[5],{"left":-45},500)
//	}
//	oBox[6].onmouseover = function(){
//		animate(oBox[7],{"left":-65},500)
//	}
//	oBox[8].onmouseover = function(){
//		animate(oBox[9],{"left":-65},500)
//	}
//	oBox[10].onmouseover = function(){
//		animate(oBox[11],{"left":-65},500)
//	}
//	oBox[12].onmouseover = function(){
//		animate(oBox[13],{"left":-65},500)
//	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
//答案是在执行动画之前添加这句话
//if (oBox[1].isAnimated) return;