function roll(direction){
	var imgLength = img.length;
	var dataLength = ad.length;
	var start = position;
	if('r' == direction){
		for(var i=0; i<imgLength; i++){
			start = start + 1;
			if(start > (dataLength-1))
				start = start - dataLength;
			img[i].src = ad[start].Photo;
		}
		position = position + 1;
		if(position > (dataLength-1))
			position = position - dataLength;
	}
	if('l' == direction){
		var a = true;
		for(var i=0; i<imgLength; i++){
			if(a){
				start = start - 1;
				if(start < 0){
					start = start + dataLength;
					a = false;
				}
				if(start < (dataLength-1)){
					a = false;
				}
			}else{
				start = start + 1;
				if(start > (dataLength-1)){
					start = start - dataLength;
					a = true;
				}
			}
			//alert(position + " === " + i + " === " + start);
			img[i].src = ad[start].Photo;
			if(start == (dataLength-1)){
				start = -1;
			}
		}
		position = position - 1;
		if(position < 0)
			position = position + dataLength;
	}
}

function right(){
	i++;
	var img0H = parseFloat(img[0].style.height);
	var img0W = parseFloat(img[0].style.width);
	var img0L = parseFloat(img[0].style.left);
	var img1H = parseFloat(img[1].style.height);
	var img1W = parseFloat(img[1].style.width);
	var img1L = parseFloat(img[1].style.left);
	var img2H = parseFloat(img[2].style.height);
	var img2W = parseFloat(img[2].style.width);
	var img2L = parseFloat(img[2].style.left);
	var img3H = parseFloat(img[3].style.height);
	var img3W = parseFloat(img[3].style.width);
	var img3L = parseFloat(img[3].style.left);
	var img4H = parseFloat(img[4].style.height);
	var img4W = parseFloat(img[4].style.width);
	var img4L = parseFloat(img[4].style.left);
	var img5H = parseFloat(img[5].style.height);
	var img5W = parseFloat(img[5].style.width);
	var img5L = parseFloat(img[5].style.left);

	//解决IE兼容性问题
	if(navigator.userAgent.indexOf("MSIE")>0 && i%2==0) {
		img1W = img1W + 1;
		img2H = img2H + 1;
		img2L = img2L + 1;
		img3H = img3H + 1;
		img3L = img3L + 1;
		img4L = img4L + 1;
		img4W = img4W + 1;
	}
	
	img[0].style.height = (img0H - 2).toString() + "px";
	img[0].style.left = (img0L - 5).toString() + "px";
	img[0].style.width = (img0W - 3).toString() + "px";
	
	img[1].style.height = (img1H - 1).toString() + "px";
	img[1].style.left = (img1L - 5).toString() + "px";
	img[1].style.width = (img1W - 1.5).toString() + "px";
	
	img[2].style.height = (img2H - 1.5).toString() + "px";
	img[2].style.left = (img2L - 6.5).toString() + "px";
	img[2].style.width = (img2W - 2).toString() + "px";
	
	img[3].style.height = (img3H + 1.5).toString() + "px";
	img[3].style.left = (img3L - 8.5).toString() + "px";
	img[3].style.width = (img3W + 2).toString() + "px";
	
	img[4].style.height = (img4H + 1).toString() + "px";
	img[4].style.left = (img4L - 6.5).toString() + "px";
	img[4].style.width = (img4W + 1.5).toString() + "px";
	
	img[5].style.height = (img5H + 2).toString() + "px";
	img[5].style.left = (img5L - 5).toString() + "px";
	img[5].style.width = (img5W + 3).toString() + "px";
	//alert(img[1].style.width);
	if(i>19){
		 clearInterval(hide);
		 reset();
		 roll('r');
		 isRunning = 'false';
	}
}

function left(){
	i++;
	var img0H = parseFloat(img[0].style.height);
	var img0W = parseFloat(img[0].style.width);
	var img0L = parseFloat(img[0].style.left);
	var img1H = parseFloat(img[1].style.height);
	var img1W = parseFloat(img[1].style.width);
	var img1L = parseFloat(img[1].style.left);
	var img2H = parseFloat(img[2].style.height);
	var img2W = parseFloat(img[2].style.width);
	var img2L = parseFloat(img[2].style.left);
	var img3H = parseFloat(img[3].style.height);
	var img3W = parseFloat(img[3].style.width);
	var img3L = parseFloat(img[3].style.left);
	var img4H = parseFloat(img[4].style.height);
	var img4W = parseFloat(img[4].style.width);
	var img4L = parseFloat(img[4].style.left);
	var img5H = parseFloat(img[5].style.height);
	var img5W = parseFloat(img[5].style.width);
	var img5L = parseFloat(img[5].style.left);

	//解决IE兼容性问题
	if(navigator.userAgent.indexOf("MSIE")>0 && i%2==0) {
		img0W = img0W + 1;
		img1H = img1H + 1;
		img1L = img1L + 1;
		img2H = img2H + 1;
		img2L = img2L + 1;
		img3L = img3L + 1;
		img3W = img3W + 1;
	}
	
	img[0].style.height = (img0H + 1).toString() + "px";
	img[0].style.left = (img0L + 5).toString() + "px";
	img[0].style.width = (img0W + 1.5).toString() + "px";
	
	img[1].style.height = (img1H + 1.5).toString() + "px";
	img[1].style.left = (img1L + 6.5).toString() + "px";
	img[1].style.width = (img1W + 2).toString() + "px";
	
	img[2].style.height = (img2H - 1.5).toString() + "px";
	img[2].style.left = (img2L + 8.5).toString() + "px";
	img[2].style.width = (img2W - 2).toString() + "px";
	
	img[3].style.height = (img3H - 1).toString() + "px";
	img[3].style.left = (img3L + 6.5).toString() + "px";
	img[3].style.width = (img3W - 1.5).toString() + "px";
	
	img[4].style.height = (img4H - 2).toString() + "px";
	img[4].style.left = (img4L + 5).toString() + "px";
	img[4].style.width = (img4W - 3).toString() + "px";
	
	img[5].style.height = (img5H + 2).toString() + "px";
	img[5].style.left = (img5L + 5).toString() + "px";
	img[5].style.width = (img5W + 3).toString() + "px";
	//alert(img[1].style.left);
	if(i>19){
		 clearInterval(hide);
		 reset();
		 roll('l');
		 isRunning = 'false';
	}
}
var isRunning;
function move(direction){
	
	//alert(isRunning);
	if(isRunning != 'udefined' && isRunning == 'true')
		return;
	frequency = 20;
	if(navigator.userAgent.indexOf("MSIE")>0) {
		frequency = 15;
   	}
   	if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
   		frequency = 20;
   	} 
	i = 0;
	if(direction == 'r'){
		cur = cur + 1;
		img[5].style.left = "640px";
		hide = setInterval("right()", frequency);
		isRunning = 'true';
	}
	if(direction == 'l'){
		cur = cur - 1;
		img[5].style.left = "-90px";
		var pos = position - 1;
		if(pos < 0)
			pos = pos + ad.length;
		img[5].src = ad[pos].Photo;
		hide = setInterval("left()", frequency);
		isRunning = 'true';
	}
	if(cur > (ad.length - 1))
		cur = 0;
	if(cur < 0)
		cur = ad.length - 1;
	//alert(cur);
	adname.href = ad[cur].url;
	if(navigator.userAgent.indexOf("Firefox")>0){
		adname.textContent = ad[cur].name;
		adtel.textContent = ad[cur].phone;
		adaddr.textContent = ad[cur].address;
		adprice.textContent = ad[cur].price;
		adtime.textContent = ad[cur].time;
	} else {
		adname.innerText = ad[cur].name;
		adtel.innerText = ad[cur].phone;
		adaddr.innerText = ad[cur].address;
		adprice.innerText = ad[cur].price;
		adtime.innerText = ad[cur].time;
	}
}

function moveC(direction){
	if(isRunning != 'true'){
		move(direction);
		clearInterval(movec);
	}
}

function moveD(direction){
	move(direction);
	if('r' == direction){
		movec = setInterval("moveC('r')",5);
	} else {
		movec = setInterval("moveC('l')",5);
	}
}

function reset(){
	img[0].style.width = "70px";
	img[0].style.height = "50px";
	img[0].style.left = "10px";
	
	img[1].style.width = "100px";
	img[1].style.height = "75px";
	img[1].style.left = "110px";
	
	img[2].style.width = "140px";
	img[2].style.height = "105px";
	img[2].style.left = "240px";
	
	img[3].style.width = "100px";
	img[3].style.height = "75px";
	img[3].style.left = "410px";
	
	img[4].style.width = "70px";
	img[4].style.height = "50px";
	img[4].style.left = "540px";
	
	img[5].style.width = "10px";
	img[5].style.height = "10px";
	img[5].style.left = "-90px";
}

autoplay = setInterval("move('r')",2000);

function openNewPage(){
	window.open(ad[cur].url);
}