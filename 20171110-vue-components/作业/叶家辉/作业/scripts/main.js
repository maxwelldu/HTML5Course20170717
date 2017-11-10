/**
 * 总开关
 */
switchBtn();

function switchBtn() {

    menu("mainMenu", "startBtn", "blackBg", ["scoreBoard", "score", "endMenu", "playAgain", "totalScore"]);

}

/**
 * 浮点随机数
 */
function RAN(n) {

    return Math.random() * n

}

/**
 * 整数随机数
 */
function RANINT(n) {

    return parseInt(Math.random() * n)

}

/**
 * 游戏开始
 */
function gameOn(elem, otherElem, callBack) {

    var container = document.getElementById(elem);

    var letterAll = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z');
    var scoreCount = 0;
    var s = 0;

    // 30秒后游戏结束
    var timeCount = setInterval(function () {

        s ++;
        if (s == 30) {
            clearInterval(appleOut);
            clearInterval(timeCount);
            container.innerHTML = "";
            if (callBack) callBack(scoreCount)
        }

    }, 1000);


    // 苹果出现
    var appleOut = setInterval(function () {
        var tempLetter = letterAll[RANINT(letterAll.length)];
        var newApple = new oApple(RAN(10), RAN(1400), RAN(20), tempLetter, container);
    }, 500);


    /**
     * 单个苹果
     */
    function oApple(top, left, speed, letter, container) {

        this.dom = null;
        this.top = top;
        this.left = left;
        this.speed = speed;
        this.timer = 0;


        this.init = function () {

            this.dom = document.createElement("div");
            this.dom.className = "apple";
            this.dom.style.top = this.top + "px";
            this.dom.style.left = this.left + "px";
            this.dom.innerText = letter;
            this.dom.id = letter;
            container.appendChild(this.dom)

        }

        this.move = function () {

            var self = this;

            this.timer = setInterval(function () {

                self.top += 2;
                if (self.top > 600) {
                    // 通过键盘删除苹果后, 该计时器还在运行
                    // 此方法能不报错, 但是内存问题未能根本解决
                    try {
                        self.die()
                    } catch (err) {

                    }
                    return
                }
                self.dom.style.top = self.top + "px";

            }, this.speed)

        }

        this.die = function () {

            clearInterval(this.timer);
            container.removeChild(this.dom)

        }

        this.init();
        this.move();
    }

    /**
     * 键盘按下事件
     */
    document.onkeydown = function (event) {

        clearApple(event);

    }

    /**
     * 清除苹果
     */
    function clearApple(event) {

        event = event || window.event;

        var getApple = document.getElementById(getKey(event.keyCode));

        if (getApple) {
            container.removeChild(getApple);
            clearInterval(getApple);
            scoreCount += 5;
            otherElem.innerHTML = scoreCount;
        } else {
            scoreCount --;
        }

    }

    /**
     * 将获取到的按键转为字母
     */
    function getKey(key) {
        for (var i = 65; i <= 90; i ++) {
            if (key == i) {
                return letterAll[i - 65];
            }
        }
    }

}

/**
 * 菜单
 */
function menu(elem, btnElem, bgElem, otherElem) {

    var menu = document.getElementById(elem);
    var bg = document.getElementById(bgElem);
    var btnStart = document.getElementById(btnElem);
    var scoreBoard = document.getElementById(otherElem[0]);
    var score = document.getElementById(otherElem[1]);
    var endMenu = document.getElementById(otherElem[2]);
    var playAgain = document.getElementById(otherElem[3]);
    var totalScore = document.getElementById(otherElem[4]);

    bg.style.display = "block";
    animation(menu, {
        "height": 300
    }, 500);
    animation(bg, {
        "opacity": 1
    }, 500);

    btnStart.onclick = function () {

        initial()

    }

    playAgain.onclick = function () {

        animation(endMenu, {
            "height": 0
        }, 500, function () {

            endMenu.style.display = "none";
            menu.style.display = "block";
            bg.style.display = "block";
            animation(menu, {
                "height": 300
            }, 500);
            animation(bg, {
                "opacity": 1
            }, 500);

        });

    }

    function initial() {

        animation(bg, {
            "opacity": 0
        }, 300, function () {
            bg.style.display = "none"
        });
        animation(menu, {
            "height": 0
        }, 500, function () {

            menu.style.display = "none";
            animation(scoreBoard, {
                "opacity": 1
            }, 500);
            gameOn("container", score, function (s) {

                totalScore.innerHTML = s;
                endMenu.style.display = "block";
                bg.style.display = "block";
                animation(scoreBoard, {
                    "opacity": 0
                }, 500);
                score.innerHTML = 0;
                animation(endMenu, {
                    "height": 400
                }, 500);
                animation(bg, {
                    "opacity": 1
                }, 500);

            });

        })

    }

}

/**
 * 简易运动框架(无兼容处理)
 */
function animation(elem, target, time, callBack) {

    var interval = 10;
    var semaphore = {};
    var step = {};
    var count = 0;
    var maxcount = time / interval;

    for (var k in target) {
        semaphore[k] = parseFloat(elem.style[k]);
        step[k] = (target[k] - semaphore[k]) / maxcount;
    }

    var timer = setInterval(function () {

        for (var k in semaphore) {
            semaphore[k] += step[k];
            if (k != "opacity") {
                elem.style[k] = semaphore[k] + "px"
            } else {
                elem.style[k] = semaphore[k];
            }
        }
        count ++;
        if (count == maxcount) {
            clearInterval(timer);
            if (callBack) {
                callBack()
            }
        }

    }, interval)

}