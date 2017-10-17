var can;
var ctx;

var w;
var h;

var padLeft = 100;
var padTop = 100;

var girlWidth = 600;
var girlHeight = 300;

var deltaTime;
var lastTime;

var girlPic = new Image();
var starPic = new Image();

var stars = [];
var num = 30;

var alive = 0;

var switchy = false;

function init() {
	can = document.getElementById("canvas");
	ctx = can.getContext("2d");

	w = can.width;
	h = can.height;

	document.addEventListener('mousemove', mousemove, false);

	girlPic.src = "src/girl.jpg";
	starPic.src = "src/star.png";

	for (var i = 0; i < num; i++) {
		stars[i] = new starObj();
		stars[i].init();
	}

	lastTime = Date.now();
	gameLoop();
}

//Windows API
//1.requestAnimFrame(function(){});
//2.setTimeout(function(){},time);
//3.setInterval(function(){},time);
//requestAnimFrame没有时间间隔，主要原因是效率起见，假设你的时间间隔非常的短，而你的function在做一个巨大量计算的事情，这个时候效率就成了一个问题
//而requestAnimFrame可以依据你的设备的性能来确定每次回调的时间，这样就能够提高了效率, 更科学

//
function gameLoop() {
	window.requestAnimFrame(gameLoop);
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;

	fillCanvas();
	drawGirl();

	drawStars();

	aliveUpdate();
}

function fillCanvas() {
	ctx.fillStyle = "#393550";
	ctx.fillRect(0, 0, w, h);
}

function drawGirl() {
	ctx.drawImage(girlPic, padLeft, padTop, girlWidth, girlHeight);
}

function mousemove(e) {
	if (e.offsetX || e.layerX) {

		var px = e.offsetX == undefined ? e.layerX : e.offsetX;
		var py = e.offsetY == undefined ? e.layerY : e.offsetY;

		if (px > padLeft && px < (padLeft + girlWidth) && py > padTop && py < (padTop + girlHeight)) {
			switchy = true;
		} else {
			switchy = false;
		}
	}
}